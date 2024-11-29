import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import EmployeeCreateUpdateModel from "../components/EmployeeCreateUpdateModel";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  deleteEmployee,
  getAlEmployee,
  getEmployeebyid,
  updateEmployee,
} from "../redux/slice/Emplopyee_slice";
import { showToast } from "../utils/config";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Loader from "../components/Loader";

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    group_name: "",
    desk_employee_id:0
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));

  //  use slectror
  const allEmployee = useSelector((state) => state.employee?.allEmployee);
  const singleEmp = useSelector((state) => state.employee?.singleEmployee);
  const loading = useSelector((state) => state.employee?.loading);

  useEffect(() => {
    setEmployeeData({
      name: singleEmp?.name,
      email: singleEmp?.email,
      group_name: singleEmp?.group_name,
   
    });
  }, [singleEmp]);

  useEffect(() => {
    if (userData) {
      dispatch(getAlEmployee());
    }
  }, []);

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const onClear = () => setSearchTerm("");

  useEffect(() => {
    if (searchTerm) {
      const filtered = allEmployee.filter((emp) =>
        emp?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData(allEmployee);
    }
  }, [allEmployee, searchTerm]);

  const handleCreate = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setEmployeeData({
      name: "",
      email: "",
      group_name: "",
      desk_employee_id:0
    });
  };

  const handleUpdate = async (data) => {
    try {
      const res = await dispatch(getEmployeebyid(data?.e_id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        if (!singleEmp?.desk_employee_id) {
          showToast("Employee ID is missing", "error");
          return;
        }

        try {
          const res = await dispatch(
            updateEmployee({
              id: singleEmp.desk_employee_id,
              newData: employeeData,
            })
          );

          if (res?.payload?.status === 1) {
            await dispatch(getAlEmployee());
            showToast(res.payload.message, "success");
            setIsModalOpen(false);
          } else if (res?.payload?.message) {
            showToast(res.payload.message, "error");
          }
        } catch (error) {
          console.error("Error during update:", error);
          showToast(
            error.message || "Something went wrong during update.",
            "error"
          );
        }
      } else {
        try {
          const res = await dispatch(createEmployee(employeeData));
          if (res?.payload?.status === 1) {
            await dispatch(getAlEmployee());
            showToast(res.payload.message, "success");
            setIsModalOpen(false);
          } else if (res?.payload?.message) {
            showToast(res.payload.message, "error");
          }
        } catch (error) {
          console.error("Error during create:", error);
          showToast(
            error.message || "Something went wrong during creation.",
            "error"
          );
        }
      }
    } catch (error) {
      console.log("Error during employee submission:", error);
      showToast("Something went wrong. Please try again later.", "error");
    }
  };

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Group Name", key: "group_name" },
  ];

  const data = filterData?.map((emp, index) => ({
    id: index + 1,
    name: emp?.name,
    group_name: emp?.group_name,
    e_id: emp?.desk_employee_id,
  }));

  // for delete
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteEmployee(rowToDelete?.e_id));

        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        dispatch(getAlEmployee());
      } catch (error) {
        console.error("Error deleting row:", error);

        showToast(error, "error");
      } finally {
        setIsModalOpendelete(false);
        setRowToDelete(null);
      }
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="min-h-screen bg-gray-50 p-0 md:p-8 ">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Employee
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search employees..."
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

        <EmployeeCreateUpdateModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={isEditMode ? "Update Employee" : "Create Employee"}
          formData={employeeData}
          setFormData={setEmployeeData}
          handleSubmit={handleSubmit}
          isEditMode={isEditMode}
        />
      </div>
    </>
  );
};

export default Employee;
