import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DMERewardCreateUpdateModal from "../components/DMERewardCreateUpdateModal";
import { showToast } from "../utils/config";
import {
  createDmeReward,
  deleteDmeReward,
  getAllDmeReward,
  getDmeRewardbyid,
  updateDmeReward,
} from "../redux/slice/Dme_Reward_slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};
const DMEReward = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [formData, setFormData] = useState({
    RuleName: "",
    MinROAS: 0,
    MinRevenue: 0,
    RewardType: "",
    RewardValue: 0,
    IsActive: false,
    CreatedOn: currentDateTime,
  });

  const initialFormData = {
    RuleName: "",
    MinROAS: 0,
    MinRevenue: 0,
    RewardType: "",
    RewardValue: 0,
    IsActive: true,
    CreatedOn: currentDateTime,
  };
  const staticData = [
    {
      RuleName: "Sample Reward Rule",
      MinROAS: 1.5,
      MinRevenue: 1000.0,
      RewardType: "Discount",
      RewardValue: 50.0,
      IsActive: true,
      CreatedOn: "2025-01-07T00:00:00Z",
    },
  ];

  // get data from redux to here -----------------
  const DmeRewardAllData = useSelector(
    (state) => state?.Dme_reward_stroe?.allDmeRewardData
  );

  const singledata = useSelector(
    (state) => state.Dme_reward_stroe?.singleDmeReward
  );
  const loading = useSelector((state) => state?.Dme_reward_stroe?.loading);

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  useEffect(() => {
    setFormData({
      RuleName: singledata?.RuleName,
      MinROAS: singledata?.MinROAS,
      MinRevenue: singledata?.MinRevenue,
      RewardType: singledata?.RewardType,
      RewardValue: singledata?.RewardValue,
      IsActive: singledata?.IsActive,
      CreatedOn: singledata?.CreatedOn,
    });
  }, [singledata]);

  // here is calling api

  useEffect(() => {
    dispatch(getAllDmeReward());
  }, []);

  const [rewardData, setRewardData] = useState(staticData);

  useEffect(() => {
    setFilterData(rewardData);
  }, [rewardData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = DmeRewardAllData.filter((reward) => {
        const allFields = `
          ${reward?.RuleName || ""}
          ${reward?.MinROAS || ""}
          ${reward?.MinRevenue || ""}
          ${reward?.RewardType || ""}
          ${reward?.RewardValue || ""}
          ${reward?.IsActive ? "Active" : "Inactive"}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(DmeRewardAllData);
    }
  }, [searchTerm, DmeRewardAllData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmeReward(rowToDelete?.r_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmeReward());
      } catch (error) {
        showToast(error, "error");
      } finally {
        setIsModalOpendelete(false);
        setRowToDelete(null);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setFormData(initialFormData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (ele) => {
    let id = ele?.r_id;
    try {
      await dispatch(getDmeRewardbyid(id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (isUpdate) {
      try {
        const res = await dispatch(
          updateDmeReward({ id: singledata?.RuleID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeReward());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmeReward(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeReward());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    closeModal();
  };

  const columns = [
    { label: "Id", key: "id" },
    { label: "Rule Name", key: "RuleName" },
    { label: "Min ROAS", key: "MinROAS" },
    { label: "Min Revenue", key: "MinRevenue" },
    { label: "Reward Type", key: "RewardType" },
    { label: "Reward Value", key: "RewardValue" },
    { label: "Is Active", key: "IsActive" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    RuleName: ele?.RuleName,
    MinROAS: ele?.MinROAS,
    MinRevenue: ele?.MinRevenue,
    RewardType: ele?.RewardType,
    RewardValue: ele?.RewardValue,
    IsActive: (
      <span
        className={`px-2 rounded-full ${
          ele?.IsActive ? " text-green-500" : " text-red-500"
        }`}
      >
        {ele?.IsActive ? "Active" : "Inactive"}
      </span>
    ),
    CreatedOn: ele?.CreatedOn,
    r_id: ele?.RuleID,
  }));

  return (
    <>
    {loading && <Loader loading={loading} />}
    <div className="bg-gray-50 p-0 md:p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
        <button
          onClick={openModal}
          className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md mb-4 md:mb-0"
        >
          Create Reward Rule
        </button>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search Reward Rule..."
            className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
          />
          <button
            onClick={onClear}
            className="px-4 py-1 bg-red-700 hover:bg-red-800 text-white rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      <DynamicTable
        columns={columns}
        data={data}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />

      <ConfirmDeleteModal
        isOpen={isModalOpendelete}
        onClose={() => setIsModalOpendelete(false)}
        onConfirm={confirmDelete}
      />

      <DMERewardCreateUpdateModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isUpdate ? "Update Reward Rule" : "Create Reward Rule"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
    </>
  );
};

export default DMEReward;
