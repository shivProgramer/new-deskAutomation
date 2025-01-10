


import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import SalesTeamsTargetCreateUpdateModal from "../components/SalesTeamsTargetCreateUpdateModal";

const SalesTeamTarget = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    TargetDescription: "Achieve 20% increase in sales",
    TargetValue: 100000.00,
    TargetType: "Sales",
    StartDate: "2025-01-01T00:00:00Z",
    EndDate: "2025-12-31T23:59:59Z",
    CreatedBy: 1,
    CreatedAt: "2025-01-05 03:02:34.140",
    employee_id: 1
  });

  const initialFormData = {
    TargetDescription: "Achieve 20% increase in sales",
    TargetValue: 100000.00,
    TargetType: "Sales",
    StartDate: "2025-01-01T00:00:00Z",
    EndDate: "2025-12-31T23:59:59Z",
    CreatedBy: 1,
    CreatedAt: "2025-01-05 03:02:34.140",
    employee_id: 1
  };

  // Static Data for SalesTeamTarget
  const all_targets = [
    {
      id: 1,
      TargetDescription: "Achieve 20% increase in sales",
      TargetValue: 100000.00,
      TargetType: "Sales",
      StartDate: "2025-01-01T00:00:00Z",
      EndDate: "2025-12-31T23:59:59Z",
      CreatedBy: 1,
      CreatedAt: "2025-01-05 03:02:34.140",
      employee_id: 1
    },
    {
      id: 2,
      TargetDescription: "Increase customer satisfaction by 15%",
      TargetValue: 120000.00,
      TargetType: "Customer Satisfaction",
      StartDate: "2025-01-01T00:00:00Z",
      EndDate: "2025-12-31T23:59:59Z",
      CreatedBy: 2,
      CreatedAt: "2025-02-15 11:15:10.360",
      employee_id: 2
    }
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
      const filtered = all_targets.filter((ele) => {
        const TargetDescription = ele?.TargetDescription?.toLowerCase() || "";
        return TargetDescription.includes(searchTerm.toLowerCase());
      });
      setFilterData(filtered);
    } else {
      setFilterData(all_targets);
    }
  }, [searchTerm]);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Target Description", key: "TargetDescription" },
    { label: "Target Value", key: "TargetValue" },
    { label: "Target Type", key: "TargetType" },
    { label: "Start Date", key: "StartDate" },
    { label: "End Date", key: "EndDate" },
    { label: "Created By", key: "CreatedBy" },
    { label: "Created At", key: "CreatedAt" },
    { label: "Employee ID", key: "employee_id" }
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    TargetDescription: ele?.TargetDescription,
    TargetValue: ele?.TargetValue,
    TargetType: ele?.TargetType,
    StartDate: ele?.StartDate,
    EndDate: ele?.EndDate,
    CreatedBy: ele?.CreatedBy,
    CreatedAt: ele?.CreatedAt,
    employee_id: ele?.employee_id,
    d_id: ele?.id
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
      TargetDescription: ele?.TargetDescription,
      TargetValue: ele?.TargetValue,
      TargetType: ele?.TargetType,
      StartDate: ele?.StartDate,
      EndDate: ele?.EndDate,
      CreatedBy: ele?.CreatedBy,
      CreatedAt: ele?.CreatedAt,
      employee_id: ele?.employee_id
    });
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // Logic for creating/updating SalesTeamTarget
    console.log(isUpdate ? "Updating target" : "Creating target", formData);
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
            Create Target
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Sales Team Target..."
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

        <SalesTeamsTargetCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Target" : "Create Target"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default SalesTeamTarget;
