import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import DMEAnalysisCreateUpdateModal from "../components/DMEAnalysisCreateUpdateModal";
import {
  createDmeAnalysis,
  deleteDmeAnalysis,
  getAllDmeAnalysis,
  getDmeAnalysisbyid,
  updateDmeAnalysis,
} from "../redux/slice/DmeAnalysis_slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const DMEAnalysis = () => {
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
    CampaignID: "",
    Note: "",
    AddedBy: 0,
    AddedOn: currentDateTime,
  });

  const initialFormData = {
    CampaignID: "",
    Note: "",
    AddedBy: 0,
    AddedOn: currentDateTime,
  };

  // get data from redux to here -----------------
  const salesAnalysisAllData = useSelector(
    (state) => state?.Dme_analysis_stroe?.allDmeAnalysisData
  );
  const singledata = useSelector(
    (state) => state.Dme_analysis_stroe?.singleDmeAnalysis
  );
  const loading = useSelector((state) => state?.Dme_analysis_stroe?.loading);

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  // api calling to here ------------------------------
  useEffect(() => {
    dispatch(getAllDmeAnalysis());
  }, []);

  useEffect(() => {
    setFormData({
      CampaignID: singledata?.CampaignID,
      Note: singledata?.Note,
      AddedBy: singledata?.AddedBy,
      AddedOn: singledata?.AddedOn,
    });
  }, [singledata]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const formatData = (data) =>
      data.map((ele, index) => ({
        id: index + 1,
        campaignName: ele?.Campaign?.Name || "N/A",
        Note: ele?.Note || "N/A",
        AddedBy: ele?.Employee?.Name || "N/A",
        AddedOn: ele?.AddedOn || "N/A",
        ana_id: ele?.AnalysisID,
      }));
    if (searchTerm) {
      const filtered = salesAnalysisAllData.filter((analysis) => {
        const allFields = `
          ${analysis?.Campaign?.Name || ""}
          ${analysis?.Note || ""}
          ${analysis?.Employee?.Name || ""}
          ${analysis?.AddedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(formatData(filtered));
    } else {
      setFilterData(formatData(salesAnalysisAllData));
    }
  }, [searchTerm, salesAnalysisAllData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmeAnalysis(rowToDelete?.ana_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmeAnalysis());
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
    let id = ele?.ana_id;
    try {
      await dispatch(getDmeAnalysisbyid(id));
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
          updateDmeAnalysis({ id: singledata?.AnalysisID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeAnalysis());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmeAnalysis(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeAnalysis());
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
    { label: "Campaign Name", key: "campaignName" },
    { label: "Note", key: "Note" },
    { label: "Added By", key: "AddedBy" },
    { label: "Added On", key: "AddedOn" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    campaignName: ele.campaignName || "N/A",
    Note: ele?.Note || "N/A",
    AddedBy: ele?.AddedBy || "N/A",
    AddedOn: ele?.AddedOn || "N/A",
    ana_id: ele?.ana_id,
  }));

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className=" bg-gray-50 p-0 md:p-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md mb-4 md:mb-0"
          >
            Create Analysis Entry
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Analysis..."
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

        <DMEAnalysisCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Analysis Entry" : "Create Analysis Entry"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMEAnalysis;
