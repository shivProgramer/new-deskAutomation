import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ProjectCreateUpdateModel from "../components/ProjectCreateUpdateModel";
import { useDispatch, useSelector } from "react-redux";
import {
  createPorject,
  deleteProjects,
  getAllProjects,
  getprojectbyid,
  updateProjects,
} from "../redux/slice/Project_cost_slice";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { showToast } from "../utils/config";

const Project = () => {
  // for create model ---------------------
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [filterData, setFilterData] = useState();
  console.log("filterData ---", filterData);
  // use selector -----------
  console.log("formData ---", formData);
  const projects = useSelector((state) => state.projects?.allProjects);
  const singledata = useSelector((state) => state.projects?.singleProduct);
  const loading = useSelector((state) => state.projects?.loading);
  console.log("projects ---", projects);
  useEffect(() => {
    setFormData({
      project_name: singledata?.project_name,
      budget: singledata?.budget,
      current_cost: singledata?.current_cost,
      actual_cost: singledata?.actual_cost,
      is_critical: singledata?.is_critical,
      project_manager_emails: singledata?.project_manager_emails,
    });
  }, [singledata]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleCreate = () => {
    setFormData({
      project_name: "",
      budget: "",
      current_cost: "",
      actual_cost: "",
      is_critical: false,
      project_manager_emails: "",
    });
    setIsEditMode(false);
    toggleModal();
  };

  const handleEdit = async (data) => {
    let id = data.p_id;
    try {
      const res = await dispatch(getprojectbyid(id));
    } catch (error) {
      showToast(error, "error");
    }

    setIsEditMode(true);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    if (isEditMode) {
      try {
        const res = await dispatch(
          updateProjects({ id: singledata?.project_id, newData: formData })
        );
        if (res?.payload) {
          await dispatch(getAllProjects());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createPorject(formData));
        if (res?.payload) {
          await dispatch(getAllProjects());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    toggleModal();
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter((product) => {
        const name = product?.project_name?.toLowerCase() || "";
        return name.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(projects);
    }
  }, [projects, searchTerm]);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Current Cost", key: "current_cost" },
    { label: "Budget", key: "budget" },
    { label: "Actual Cost", key: "actual_cost" },
    { label: "Role", key: "role" },
  ];

  const data = filterData?.map((project, index) => ({
    id: index + 1,
    name: project?.project_name,
    current_cost: "₹ " + project?.current_cost,
    budget: "₹ " + project?.budget,
    actual_cost: "₹ " + project?.actual_cost,
    role: project.is_critical ? "Critical" : "Non-Critical",
    p_id: project?.project_id,
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
        const res = await dispatch(deleteProjects(rowToDelete?.p_id));

        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllProjects());
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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
          {/* Left Side: Create Project Button */}
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Project
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
              //   onClick={onSearch}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </div>

        <DynamicTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ConfirmDeleteModal
          isOpen={isModalOpendelete}
          onClose={() => setIsModalOpendelete(false)}
          onConfirm={confirmDelete}
        />

        <ProjectCreateUpdateModel
          isOpen={isModalOpen}
          onClose={toggleModal}
          title={isEditMode ? "Edit Project" : "Create Project"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Project;
