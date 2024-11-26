// import React from 'react'

// const Horuly_Rate = () => {
//   return (
//     <div>Horuly_Rate</div>
//   )
// }

// export default Horuly_Rate

import React, { useState } from "react";
import DynamicTable from "../components/DynamicTable";

import HourlyRateCreateUpdateModel from "../components/HourlyRateCreateUpdateModel";

const Hourly_Rate = () => {
  // for create model ---------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    bill_rate: "",
    pay_rate: "",
  });

  const [isUpdate, setIsUpdate] = useState(false); // To track if it's an update or create action

  const initialFormData = {
    employee_id: "",
    employee_name: "",
    bill_rate: "",
    pay_rate: "",
  };

  // Handle opening the modal for creating a new hourly rate
  const handleOpen = () => {
    setFormData(initialFormData); // Reset form data
    setIsUpdate(false); // Indicate "Create" mode
    setIsModalOpen(true);
  };

  // Handle opening the modal for updating an existing hourly rate
  const handleUpdate = (hourlyRate) => {
    setFormData(hourlyRate); // Load existing data into the form
    setIsUpdate(true); // Indicate "Update" mode
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      console.log("Updating Hourly Rate: ", formData);
    } else {
      console.log("Creating New Hourly Rate: ", formData);
    }
    handleModalClose();
  };

  // Sample data for testing the update functionality
  const sampleData = {
    employee_id: 3,
    employee_name: "John Doe",
    bill_rate: 150.0,
    pay_rate: 100.0,
  };
  // for table
  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Viewer" },
    { id: 4, name: "Chris Evans", email: "chris@example.com", role: "Admin" },
    { id: 5, name: "Bruce Wayne", email: "bruce@example.com", role: "Editor" },
    { id: 6, name: "Clark Kent", email: "clark@example.com", role: "Viewer" },
    { id: 7, name: "Sam Wilson", email: "sam@example.com", role: "Viewer" },
    { id: 8, name: "Chris Evans", email: "chris@example.com", role: "Admin" },
    { id: 9, name: "Bruce Wayne", email: "bruce@example.com", role: "Editor" },
    { id: 10, name: "Clark Kent", email: "clark@example.com", role: "Viewer" },
    { id: 11, name: "Clark Kent", email: "clark@example.com", role: "Viewer" },
    { id: 12, name: "Clark Kent", email: "clark@example.com", role: "Viewer" },
    // Add more rows as needed
  ];

  const handleDelete = (row) => {
    alert(`Deleting row with ID: ${row.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
        {/* Left Side: Create Project Button */}
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
        >
          Create Hourly
        </button>

        {/* Right Side: Search Bar with Button */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            //   value={searchTerm}
            //   onChange={handleSearchInputChange}
            placeholder="Search projects..."
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
          />
          <button
            //   onClick={onSearch}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
          >
            Search
          </button>
        </div>
      </div>

      <DynamicTable
        columns={columns}
        data={data}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />

<HourlyRateCreateUpdateModel
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={isUpdate ? "Update Hourly Rate" : "Create Hourly Rate"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Hourly_Rate;
