import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DMECampaignCreateUpdateModal from "../components/DMECampaignCreateUpdateModal";
import { showToast } from "../utils/config";
import {
  createDmeCompaign,
  deleteDmeCompaign,
  getAllDmeCompaign,
  getDmeCompaignbyid,
  updateDmeCompaign,
} from "../redux/slice/Dme_Compaign_slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const DMECampaign = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [currentDateTime, setCurrentDateTime] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  let user_id;
  if (userData) {
    user_id = userData?.user_id;
  }

  const [formData, setFormData] = useState({
    CampaignName: "",
    Platform: "",
    Objective: "",
    StartDate: "",
    EndDate: "",
    CreatedBy: 0,
    CreatedOn: currentDateTime,
    IsActive: false,
  });

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);
  const initialFormData = {
    CampaignName: "",
    Platform: "",
    Objective: "",
    StartDate: "",
    EndDate: "",
    CreatedBy: 0,
    CreatedOn: currentDateTime,
    IsActive: false,
  };

  // get data from redux to here -----------------
  const salesCompaginAllData = useSelector(
    (state) => state?.Dme_compaign_store?.allDmeCompaignData
  );
  const singledata = useSelector(
    (state) => state.Dme_compaign_store?.singleDmeCompaign
  );
  const loading = useSelector((state) => state?.Dme_compaign_store?.loading);

  // api calling to here ------------------------------
  useEffect(() => {
    dispatch(getAllDmeCompaign());
  }, []);

  useEffect(() => {
    setFormData({
      CampaignName: singledata?.CampaignName,
      Platform: singledata?.Platform,
      Objective: singledata?.Objective,
      StartDate: singledata?.StartDate,
      EndDate: singledata?.EndDate,
      CreatedBy: singledata?.CreatedBy,
      CreatedOn: singledata?.CreatedOn,
      IsActive: singledata?.IsActive,
    });
  }, [singledata]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = salesCompaginAllData.filter((campaign) => {
        const allFields = `
          ${campaign?.CampaignName || ""}
          ${campaign?.Platform || ""}
          ${campaign?.Objective || ""}
          ${campaign?.StartDate || ""}
          ${campaign?.EndDate || ""}
          ${campaign?.CreatedBy || ""}
          ${campaign?.CreatedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(salesCompaginAllData);
    }
  }, [searchTerm, salesCompaginAllData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmeCompaign(rowToDelete?.cmp_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmeCompaign());
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
    let id = ele?.cmp_id;
    try {
      await dispatch(getDmeCompaignbyid(id));
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
          updateDmeCompaign({ id: singledata?.CampaignID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeCompaign());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmeCompaign(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeCompaign());
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
    { label: "Campaign Name", key: "CampaignName" },
    { label: "Platform", key: "Platform" },
    { label: "Objective", key: "Objective" },
    { label: "Start Date", key: "StartDate" },
    { label: "End Date", key: "EndDate" },
    { label: "Is Active", key: "IsActive" },
  ];
  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    CampaignName: ele?.CampaignName || "N/A",
    Platform: ele?.Platform || "N/A",
    Objective: ele?.Objective || "N/A",
    StartDate: ele?.StartDate || "N/A",
    EndDate: ele?.EndDate || "N/A",
    IsActive: (
      <span
        className={`px-2 rounded-full ${
          ele?.IsActive ? " text-green-500" : " text-red-500"
        }`}
      >
        {ele?.IsActive ? "Active" : "Inactive"}
      </span>
    ),
    // CreatedAt: ele?.CreatedAt,
    cmp_id: ele?.CampaignID,
  }));

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className=" bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Campaign
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Campaign..."
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

        <DMECampaignCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Campaign" : "Create Campaign"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMECampaign;
