import React, { useState } from "react";
import DynamicTable from "../components/DynamicTable";

const Ecomm_Projectlist = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSend = () => {
    alert(`The checkbox is ${isChecked ? "checked" : "unchecked"}. List sent!`);
  };

// Column structure
const columns = [
  { label: "Project ID", key: "project_id" },
  { label: "Name", key: "name" },
  { label: "Email Code", key: "email_code" },
  { label: "Is Active", key: "is_active" },
  { label: "Account Manager Name", key: "account_manager_name" },
  { label: "Account Manager Email", key: "account_manager_email" },
  { label: "Employee ID", key: "employee_id" },
];

// Dummy data
const filterData = [
  {
    project_id: 101,
    name: "Project Alpha",
    email_code: 12345,
    is_active: true,
    account_manager_name: "Alice Johnson",
    account_manager_email: "alice.johnson@example.com",
    employee_id: 1001,
  },
  {
    project_id: 102,
    name: "Project Beta",
    email_code: 67890,
    is_active: false,
    account_manager_name: "Bob Smith",
    account_manager_email: "bob.smith@example.com",
    employee_id: 1002,
  },
  {
    project_id: 103,
    name: "Project Gamma",
    email_code: 11223,
    is_active: true,
    account_manager_name: "Charlie Brown",
    account_manager_email: "charlie.brown@example.com",
    employee_id: 1003,
  },
];

const data = filterData.map((ele) => ({
  project_id: ele.project_id,
  name: ele.name,
  email_code: ele.email_code,
  is_active: ele.is_active ? "Active" : "Inactive", 
  account_manager_name: ele.account_manager_name,
  account_manager_email: ele.account_manager_email,
  employee_id: ele.employee_id,
}));

console.log(data);
  

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-2 md:mx-10 md:mt-3  w-80 md:w-96">
        <h1 className="text-lg font-semibold mb-4 text-center text-gray-700">
          E-commerce Project List
        </h1>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2 w-5 h-5 text-[#1F2937] bg-[#1F2937] border-gray-300 rounded focus:ring-[#171f2b]"
            />
            Select Item
          </label>
        </div>
        <button
          onClick={handleSend}
          className="w-full bg-[#1F2937] hover:bg-[#1F2937] text-white py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all"
        >
          Send List
        </button>
      </div>

      <DynamicTable
        columns={columns}
        data={data}
        // onEdit={handleUpdate}
        // onDelete={handleDelete}
      />
    </>
  );
};

export default Ecomm_Projectlist;
