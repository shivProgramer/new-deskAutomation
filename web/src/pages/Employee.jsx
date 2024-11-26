import React, { useState } from "react";
import DynamicTable from "../components/DynamicTable";
import EmployeeCreateUpdateModel from "../components/EmployeeCreateUpdateModel";

const Employee = () => {
  // for create model ---------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    group_id: "",
    group_name: "",
    profile_url: "",
    user_id: "",
    password: "",
  });

  const handleCreate = () => {
    setIsModalOpen(true);
    setEmployeeData({
      name: "",
      email: "",
      group_id: "",
      group_name: "",
      profile_url: "",
      user_id: "",
      password: "",
    });
  };

  const handleUpdate = (data) => {
    setIsModalOpen(true);
    setEmployeeData(data);
  };

  const handleSubmit = () => {
    // Handle save or update logic
    console.log(employeeData);
    setIsModalOpen(false);
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
          onClick={handleCreate}
          className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
        >
          Create Employees
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

      <EmployeeCreateUpdateModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={employeeData.user_id ? "Update Employee" : "Create Employee"}
        formData={employeeData}
        setFormData={setEmployeeData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Employee;
