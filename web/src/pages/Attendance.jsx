


import React, { useState } from "react";
import DynamicTable from "../components/DynamicTable";
import EmployeeCreateUpdateModel from "../components/EmployeeCreateUpdateModel";
import AttendanceCreateUpdateModel from "../components/AttendanceCreateUpdateModel ";

const Attendance = () => {
  // for create model ---------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    desk_employee_id: "",
    date: "",
    arrived: "",
    left: "",
    online_time: "",
    offline_time: "",
    desktime_time: "",
    at_work_time: "",
    after_work_time: "",
    before_work_time: "",
    productive_time: "",
    productivity: "",
    efficiency: "",
    work_starts: "",
    work_ends: "",
    late: false,
    is_online: false
  });
  
  // Flag to check if the modal is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle opening the modal for creating a new attendance record
  const handleOpenModal = () => {
    setAttendanceData({
      desk_employee_id: "",
      date: "",
      arrived: "",
      left: "",
      online_time: "",
      offline_time: "",
      desktime_time: "",
      at_work_time: "",
      after_work_time: "",
      before_work_time: "",
      productive_time: "",
      productivity: "",
      efficiency: "",
      work_starts: "",
      work_ends: "",
      late: false,
      is_online: false
    });
    setIsEditing(false); // Set editing flag to false for creating new record
    setIsModalOpen(true);
  };

  // Handle opening the modal for editing an existing attendance record
  const handleEditModal = (data) => {
    setAttendanceData(data);
    setIsEditing(true); // Set editing flag to true for updating the record
    setIsModalOpen(true);
  };

  // Handle form submission (create or update attendance record)
  const handleSubmit = () => {
    if (isEditing) {
      // Update existing record logic (make API call or handle update)
      console.log("Updating attendance:", attendanceData);
    } else {
      // Create new record logic (make API call or handle create)
      console.log("Creating attendance:", attendanceData);
    }
    setIsModalOpen(false); // Close modal after submission
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
          onClick={handleOpenModal}
          className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
        >
          Create Attendance
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
        onEdit={handleEditModal}
        onDelete={handleDelete}
      />

<AttendanceCreateUpdateModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Attendance" : "Create Attendance"}
        formData={attendanceData}
        setFormData={setAttendanceData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Attendance;
