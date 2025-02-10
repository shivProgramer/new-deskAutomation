import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import moment from "moment";
import ProjectTasksEmployeeCreateUpdateModel from "../components/ProjectTasksEmployeeCreateUpdateModel";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectTasksEmployee,
  deleteProjectTasksEmployee,
  getAllProjectTasksEmployee,
  getProjectTasksEmployeebyid,
  updateProjectTasksEmployee,
} from "../redux/slice/ProjectTasksEmployee_slice";
const ProjectTasksEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const dispatch = useDispatch();

  // get data from redux to here -----------------
  const DmeProjectTaskEmp = useSelector(
    (state) => state?.ProjectTasksEmployee_store?.allProjectTasksEmployeeData
  );
  const singledata = useSelector(
    (state) => state.ProjectTasksEmployee_store?.singleProjectTasksEmployee
  );
  const loading = useSelector(
    (state) => state?.ProjectTasksEmployee_store?.loading
  );

  console.log("singledata ---", singledata);

  const [formData, setFormData] = useState({
    Task_ID: 0,
    Employee_ID: 0,
    Due_Date: "",
    Priority: "",
    Status: "",
    IsClosed: false,
  });
  const initialFormData = {
    Task_ID: 0,
    Employee_ID: 0,
    Due_Date: "",
    Priority: "",
    Status: "",
    IsClosed: false,
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setFormData(initialFormData);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFormData({
      Task_ID: singledata?.Task_ID,
      Employee_ID: singledata?.Employee_ID,
      Due_Date: singledata?.Due_Date,
      Priority: singledata?.Priority,
      Status: singledata?.Status,
      IsClosed: singledata?.IsClosed,
    });
  }, [singledata]);

  console.log("formData ---", formData);

  const handleUpdate = async (ele) => {
    let id = ele?.Task_ID;
    try {
      await dispatch(getProjectTasksEmployeebyid(id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  //   const handleSubmit = () => {
  //     showToast(
  //       isUpdate ? "Task updated successfully" : "Task created successfully",
  //       "success"
  //     );
  //     closeModal();
  //   };

  const handleSubmit = async () => {
    if (isUpdate) {
        console.log("isUpdate -----" , isUpdate)
      try {
        const res = await dispatch(
            updateProjectTasksEmployee({ id: singledata?.Task_ID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllProjectTasksEmployee());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createProjectTasksEmployee(formData));
        console.log("res ---", res);
        if (res?.payload?.status === 1) {
          await dispatch(getAllProjectTasksEmployee());
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

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteProjectTasksEmployee(rowToDelete?.Task_ID));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllProjectTasksEmployee());
      } catch (error) {
        showToast(error, "error");
      } finally {
        setIsModalOpendelete(false);
        setRowToDelete(null);
      }
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const onClear = () => {
    setSearchTerm("");
  };
  useEffect(() => {
    if (searchTerm) {
      const filtered = DmeProjectTaskEmp.filter((roas) => {
        const allFields = ` 
            ${roas?.Priority || ""} 
            ${roas?.Status || ""}
          `.toLowerCase();
        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(DmeProjectTaskEmp);
    }
  }, [searchTerm, DmeProjectTaskEmp]);

  // here is calling api

  useEffect(() => {
    dispatch(getAllProjectTasksEmployee());
  }, []);

  const columns = [
    { label: "Task ID", key: "Task_ID" },
    { label: "Employee ID", key: "Employee_ID" },
    { label: "Due Date", key: "Due_Date" },
    { label: "Priority", key: "Priority" },
    { label: "Status", key: "Status" },
    { label: "Is Closed", key: "IsClosed" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    Task_ID: ele?.Task_ID || 0,
    Employee_ID: ele?.Employee_ID || "N/A",
    Due_Date: ele?.Due_Date
      ? moment(ele?.Due_Date).format("YYYY, MMM DD")
      : "N/A",
    Priority: ele?.Priority || "N/A",
    Status: ele?.Status || "N/A",

    IsClosed: (
      <span
        style={{
          color: ele?.IsClosed ? "green" : "red",
          fontWeight: "semibold",
        }}
      >
        {ele?.IsClosed ? "Yes" : "No"}
      </span>
    ),
  }));

  return (
    <>
      {" "}
      {loading && <Loader loading={loading} />}
      <div className="bg-gray-50 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md mb-4 md:mb-0"
          >
            Create Task
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search ROAS..."
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
        <ProjectTasksEmployeeCreateUpdateModel
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Task" : "Create Task"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default ProjectTasksEmployee;
