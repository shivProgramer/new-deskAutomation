import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import SalesRewardCreateUpdateModal from "../components/SalesRewardCreateUpdateModal";
import {
  createSalesReward,
  deleteSalesReward,
  getAllSalesReward,
  getSalesRewardbyid,
  updateSalesReward,
} from "../redux/slice/SalesReward_slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { showToast } from "../utils/config";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const SalesReward = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    TargetPercentage: "",
    TargetValue: "",
    RewardValue: "",
    RewardDescription: "",
    RewardType: "",
    ValidFrom: "",
    ValidTo: "",
    CreatedBy: "",
    CreatedAt: "",
  });

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  let user_id;
  if (userData) {
    user_id = userData?.user_id;
  }
  
  // get data from redux to here -----------------
  const salesRewardAllData = useSelector(
    (state) => state?.sales_reward?.allSalesRewardData
  );

  const singledata = useSelector(
    (state) => state.sales_reward?.singleSalesReward
  );
  const loading = useSelector((state) => state?.sales_reward?.loading);

  const initialFormData = {
    TargetPercentage: "",
    TargetValue: "",
    RewardValue: "",
    RewardDescription: "",
    RewardType: "",
    ValidFrom: "",
    ValidTo: "",
    CreatedBy: user_id,
    CreatedAt: currentDateTime,
  };

  // Filtering the data based on search term
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = salesRewardAllData.filter((ele) => {
        // Combine all fields into a single string for searching
        const combinedFields = `
          ${ele?.RewardDescription || ""}
          ${ele?.RewardType || ""}
          ${ele?.TargetPercentage || ""}
          ${ele?.RewardValue || ""}
          ${ele?.ValidFrom || ""}
          ${ele?.ValidTo || ""}
        `.toLowerCase();

        return combinedFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(salesRewardAllData);
    }
  }, [searchTerm, salesRewardAllData]);

  useEffect(() => {
    setFormData({
      TargetPercentage: singledata?.TargetPercentage,
      TargetValue: singledata?.TargetValue,
      RewardValue: singledata?.RewardValue,
      RewardDescription: singledata?.RewardDescription,
      RewardType: singledata?.RewardType,
      ValidFrom: singledata?.ValidFrom,
      ValidTo: singledata?.ValidTo,
      CreatedBy: singledata?.CreatedBy,
      CreatedAt: singledata?.CreatedAt,
    });
  }, [singledata]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setFormData(initialFormData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // api calling to here ------------------------------
  useEffect(() => {
    dispatch(getAllSalesReward());
  }, []);

  const handleUpdate = async (ele) => {
    let id = ele.r_id;
    try {
      await dispatch(getSalesRewardbyid(id));
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
          updateSalesReward({ id: singledata?.RewardID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllSalesReward());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createSalesReward(formData));

        if (res?.payload?.status === 1) {
          await dispatch(getAllSalesReward());
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
    { label: "ID", key: "id" },
    { label: "Target Percentage", key: "TargetPercentage" },
    { label: "Reward Value", key: "RewardValue" },
    { label: "Reward Description", key: "RewardDescription" },
    { label: "Reward Type", key: "RewardType" },
    { label: "Valid From", key: "ValidFrom" },
    { label: "Valid To", key: "ValidTo" },
    // { label: "Created At", key: "CreatedAt" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    TargetPercentage: ele?.TargetPercentage || "N/A",
    RewardValue: ele?.RewardValue || "N/A",
    RewardDescription: ele?.RewardDescription || "N/A",
    RewardType: ele?.RewardType || "N/A",
    ValidFrom: ele?.ValidFrom || "N/A",
    ValidTo: ele?.ValidTo || "N/A",
    // CreatedAt: ele?.CreatedAt,
    r_id: ele?.RewardID,
  }));

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteSalesReward(rowToDelete?.r_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllSalesReward());
      } catch (error) {
        showToast(error, "error");
      } finally {
        setIsModalOpendelete(false);
        setRowToDelete(null);
      }
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="min-h-screen bg-gray-50 p-0 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Reward
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Sales Reward..."
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
            />
            <button
              onClick={onClear}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
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

        <SalesRewardCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Reward" : "Create Reward"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default SalesReward;
