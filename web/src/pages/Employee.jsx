import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import EmployeeCreateUpdateModel from "../components/EmployeeCreateUpdateModel";
import { useDispatch, useSelector } from "react-redux";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";

const Employee = () => {
  // for create model ---------------------
  const [searchTerm, setSearchTerm] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData, setFilterData] = useState();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    group_id: "",
    group_name: "",
    profile_url: "",
    user_id: "",
    password: "",
  });
  // selector 
  const allEmployee = useSelector((state) => state.employee?.allEmployee);
  // const singledata = useSelector((state) => state.projects?.singleProduct);
  const loading = useSelector((state) => state.employee?.loading);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"))
  useEffect(() => {
    if(userData){
      dispatch(getAlEmployee(userData?.user_id));
    }
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () =>{
    setSearchTerm('')
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = allEmployee.filter((emp) => {
        const name = emp?.name?.toLowerCase() || "";
        return name.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(allEmployee);
    }
  }, [allEmployee, searchTerm]);


  console.log("allEmployee ----" , allEmployee)

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
    { label: "Group Name ", key: "group_name" },
  ];

  const data = filterData?.map((emp, index) => ({
    id: index + 1,
    name: emp?.name,
    group_name: emp?.group_name,
    e_id: emp?.desk_employee_id,
  }));
  

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
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search projects..."
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
