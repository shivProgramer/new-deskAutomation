import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import DMEAnalysisCreateUpdateModal from "../components/DMEAnalysisCreateUpdateModal";
import { getAllDmeAnalysis } from "../redux/slice/DmeAnalysis_slice";
import { useDispatch, useSelector } from "react-redux";
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
    AddedBy: 1,
    AddedOn: currentDateTime,
  });

  const initialFormData = {
    CampaignID: "",
    Note: "",
    AddedBy: 1,
    AddedOn: currentDateTime,
  };

  // get data from redux to here -----------------
  const salesCompaginAllData = useSelector(
    (state) => state?.Dme_analysis_stroe?.allDmeAnalysisData
  );
  const singledata = useSelector(
    (state) => state.Dme_analysis_stroe?.singleDmeAnalysis
  );
  const loading = useSelector((state) => state?.Dme_analysis_stroe?.loading);

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  const staticData = [
    {
      CampaignID: 2,
      Note: "This is a test note for analysis.",
      AddedBy: 12,
      AddedOn: "2025-01-06T10:00:00",
    },
  ];

  const [analysisData, setAnalysisData] = useState(staticData);


   // api calling to here ------------------------------
    useEffect(() => {
      dispatch(getAllDmeAnalysis());
    }, []);
  
    
  useEffect(() => {
    setFilterData(analysisData);
  }, [analysisData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = analysisData.filter((analysis) => {
        const allFields = `
          ${analysis?.CampaignID || ""}
          ${analysis?.Note || ""}
          ${analysis?.AddedBy || ""}
          ${analysis?.AddedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(analysisData);
    }
  }, [searchTerm, analysisData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = analysisData.filter(
        (analysis) => analysis.CampaignID !== rowToDelete.CampaignID
      );
      setAnalysisData(updatedData);
      showToast("Analysis entry deleted successfully", "success");
      setIsModalOpendelete(false);
      setRowToDelete(null);
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

  const handleUpdate = (analysis) => {
    setFormData(analysis);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = analysisData.map((analysis) =>
        analysis.CampaignID === formData.CampaignID ? formData : analysis
      );
      setAnalysisData(updatedData);
      showToast("Analysis entry updated successfully", "success");
    } else {
      setAnalysisData([...analysisData, formData]);
      showToast("Analysis entry created successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Campaign ID", key: "CampaignID" },
    { label: "Note", key: "Note" },
    { label: "Added By", key: "AddedBy" },
    { label: "Added On", key: "AddedOn" },
  ];

  const data = filterData.map((analysis, index) => ({
    id: index + 1,
    ...analysis,
  }));

  return (
    <>
      <div className=" bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
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
