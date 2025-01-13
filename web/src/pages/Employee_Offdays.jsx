import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable"; // Assuming you are reusing the same DynamicTable component
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { showToast } from "../utils/config";
import EmployeeOffdayCreateUpdateModal from "../components/EmployeeOffdayCreateUpdateModal";
import { createEmployeeoffdays, deleteEmployeeoffdays, getAllEmployeeoffdays, getEmployeeoffdaysbyid, updateEmployeeoffdays } from "../redux/slice/Employee_offDay_slice";

const Employee_Offdays = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    desk_employee_id: 0,
    off_date: "",
    is_covered: false,
    covered_date: "",
    reason: "",
    created_at: "",
    updated_at: "",
  });
 
  const [currentDateTime, setCurrentDateTime] = useState("");

  // get data from redux to here -----------------
  const EmployeeOffAllData = useSelector(
    (state) => state?.employee_ofday_stroe?.allEmployeeoffdaysData?.data
  );
  const singledata = useSelector(
    (state) => state.employee_ofday_stroe?.singleEmployeeoffdays
  );
  const loading = useSelector((state) => state?.employee_ofday_stroe?.loading);



  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    setCurrentDateTime(`${date} ${time}.${milliseconds}`);
  }, []);

  
   useEffect(() => {
      setFormData({
        desk_employee_id: singledata?.desk_employee_id,
        off_date:singledata?.off_date,
        is_covered: singledata?.is_covered,
        covered_date: singledata?.covered_date,
        reason: singledata?.reason,
        created_at:singledata?.created_at,
        updated_at: singledata?.updated_at,
      });
    }, [singledata]);

  // api calling to here ------------------------------
  useEffect(() => {
    dispatch(getAllEmployeeoffdays());
  }, []);

  // Filtering the data based on search term
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = EmployeeOffAllData.filter((ele) => {
        const combinedFields = `
          ${ele?.reason || ""}
          ${ele?.off_date || ""}
          ${ele?.covered_date || ""}
          ${ele?.employee_name || ""}
         
        `.toLowerCase();

        return combinedFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(EmployeeOffAllData);
    }
  }, [searchTerm, EmployeeOffAllData]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setFormData({
      desk_employee_id: 0,
      off_date: "",
      is_covered: false,
      covered_date: "",
      reason: "",
      created_at: currentDateTime,
      updated_at: currentDateTime,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


const handleUpdate = async (ele) => {
    let id = ele.emp_id;
    try {
      await dispatch(getEmployeeoffdaysbyid(id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsUpdate(true);
    setIsModalOpen(true);
  };



 const handleSubmit = async () => {
    if (isUpdate) {
      try {
        const res = await dispatch(
            updateEmployeeoffdays({ id: singledata?.id, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await    dispatch(getAllEmployeeoffdays());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createEmployeeoffdays(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllEmployeeoffdays());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    closeModal();
  };


  const columns = [
    { label: "Id", key: "id" },
    { label: "Employee Name", key: "desk_employee_id" },
    { label: "Off Date", key: "off_date" },
    { label: "Covered", key: "is_covered" },
    { label: "Covered Date", key: "covered_date" },
    { label: "Reason", key: "reason" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    desk_employee_id: ele?.employee_name || "N/A",
    off_date: ele?.off_date || "N/A",
    is_covered: (
      <span
        style={{
          color: ele?.is_covered ? "green" : "red",
          fontWeight: "semibold",
        }}
      >
        {ele?.is_covered ? "Yes" : "No"}
      </span>
    ),
    covered_date: ele?.covered_date || "N/A",
    reason: ele?.reason || "N/A",
    emp_id: ele?.id || "N/A",
  }));

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };


    const confirmDelete = async () => {
      if (rowToDelete) {
        try {
          const res = await dispatch(deleteEmployeeoffdays(rowToDelete?.emp_id));
          if (res?.payload) {
            showToast(res?.payload?.message, "success");
          }
          await dispatch(getAllEmployeeoffdays());
        } catch (error) {
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
      <div className="min-h-screen bg-gray-50 p-0 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Off Day
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Off Day..."
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

        <EmployeeOffdayCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Off Day" : "Create Off Day"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Employee_Offdays;
