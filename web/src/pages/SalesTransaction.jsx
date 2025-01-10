

import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import SalesTransactionCreateUpdateModal from "../components/SalesTransactionCreateUpdateModal";

const SalesTransaction = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    EmployeeID: 1,
    SaleDate: "2025-01-26",
    SaleValue: 1500,
    RewardValue: 100,
    SalesSource: "Online",
    ProjectName: "Project A",
    AdCampaignName: "Campaign 1",
    DivisionName: "Sales Division 1",
    CreatedAt: "2025-01-05 03:02:17.360",
  });

  const initialFormData = {
    EmployeeID: 1,
    SaleDate: "2025-01-26",
    SaleValue: 1500,
    RewardValue: 100,
    SalesSource: "Online",
    ProjectName: "Project A",
    AdCampaignName: "Campaign 1",
    DivisionName: "Sales Division 1",
    CreatedAt: "2025-01-05 03:02:17.360",
  };

  // Static Data for SalesTransaction
  const all_transactions = [
    {
      id: 1,
      EmployeeID: 1,
      SaleDate: "2025-01-26",
      SaleValue: 1500,
      RewardValue: 100,
      SalesSource: "Online",
      ProjectName: "Project A",
      AdCampaignName: "Campaign 1",
      DivisionName: "Sales Division 1",
      CreatedAt: "2025-01-05 03:02:17.360",
    },
    {
      id: 2,
      EmployeeID: 2,
      SaleDate: "2025-01-27",
      SaleValue: 2000,
      RewardValue: 150,
      SalesSource: "Offline",
      ProjectName: "Project B",
      AdCampaignName: "Campaign 2",
      DivisionName: "Sales Division 2",
      CreatedAt: "2025-01-15 11:20:30.360",
    },
    // Add more static data as needed
  ];

  // Filtering the data based on search term
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = all_transactions.filter((ele) => {
        const ProjectName = ele?.ProjectName?.toLowerCase() || "";
        return ProjectName.includes(searchTerm.toLowerCase());
      });
      setFilterData(filtered);
    } else {
      setFilterData(all_transactions);
    }
  }, [searchTerm]);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Employee ID", key: "EmployeeID" },
    { label: "Sale Date", key: "SaleDate" },
    { label: "Sale Value", key: "SaleValue" },
    { label: "Reward Value", key: "RewardValue" },
    { label: "Sales Source", key: "SalesSource" },
    { label: "Project Name", key: "ProjectName" },
    { label: "Ad Campaign Name", key: "AdCampaignName" },
    { label: "Division Name", key: "DivisionName" },
    { label: "Created At", key: "CreatedAt" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    EmployeeID: ele?.EmployeeID,
    SaleDate: ele?.SaleDate,
    SaleValue: ele?.SaleValue,
    RewardValue: ele?.RewardValue,
    SalesSource: ele?.SalesSource,
    ProjectName: ele?.ProjectName,
    AdCampaignName: ele?.AdCampaignName,
    DivisionName: ele?.DivisionName,
    CreatedAt: ele?.CreatedAt,
    d_id: ele?.id,
  }));

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      // In a real case, delete logic here
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

  const handleUpdate = (ele) => {
    setFormData({
      EmployeeID: ele?.EmployeeID,
      SaleDate: ele?.SaleDate,
      SaleValue: ele?.SaleValue,
      RewardValue: ele?.RewardValue,
      SalesSource: ele?.SalesSource,
      ProjectName: ele?.ProjectName,
      AdCampaignName: ele?.AdCampaignName,
      DivisionName: ele?.DivisionName,
      CreatedAt: ele?.CreatedAt,
    });
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // Logic for creating/updating SalesTransaction
    console.log(isUpdate ? "Updating transaction" : "Creating transaction", formData);
    closeModal();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-0 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Transaction
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Sales Transaction..."
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

        <SalesTransactionCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Transaction" : "Create Transaction"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default SalesTransaction;
