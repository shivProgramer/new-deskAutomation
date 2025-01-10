import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import DMEPerformanceCreateUpdateModal from "../components/DMEPerformanceCreateUpdateModal";

const DMEPerformance = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormData = {
    CampaignID: "",
    Impressions: "",
    Clicks: "",
    Conversions: "",
    UpdatedOn: new Date().toISOString(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const staticData = [
    {
      CampaignID: 1,
      Impressions: 15000,
      Clicks: 350,
      Conversions: 25,
      UpdatedOn: "2024-01-15 15:30:00.000",
    },
  ];

  const [performanceData, setPerformanceData] = useState(staticData);

  useEffect(() => {
    setFilterData(performanceData);
  }, [performanceData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = performanceData.filter((data) => {
        const allFields = `
          ${data?.CampaignID || ""}
          ${data?.Impressions || ""}
          ${data?.Clicks || ""}
          ${data?.Conversions || ""}
          ${data?.UpdatedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(performanceData);
    }
  }, [searchTerm, performanceData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = performanceData.filter(
        (data) => data.CampaignID !== rowToDelete.CampaignID
      );
      setPerformanceData(updatedData);
      showToast("Performance data deleted successfully", "success");
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

  const handleUpdate = (data) => {
    setFormData(data);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = performanceData.map((data) =>
        data.CampaignID === formData.CampaignID ? formData : data
      );
      setPerformanceData(updatedData);
      showToast("Performance data updated successfully", "success");
    } else {
      setPerformanceData([...performanceData, formData]);
      showToast("Performance data created successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Campaign ID", key: "CampaignID" },
    { label: "Impressions", key: "Impressions" },
    { label: "Clicks", key: "Clicks" },
    { label: "Conversions", key: "Conversions" },
    { label: "Updated On", key: "UpdatedOn" },
  ];

  const data = filterData.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  return (
    <>
      <div className="bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Add Performance Data
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Performance Data..."
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

        <DMEPerformanceCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Performance Data" : "Add Performance Data"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMEPerformance;
