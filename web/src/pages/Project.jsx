import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ProjectCreateUpdateModel from "../components/ProjectCreateUpdateModel";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjects, getAllProjects } from "../redux/slice/Project_cost_slice";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const Project = () => {
  // for create model ---------------------
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // use selector -----------

  const projects = useSelector((state) => state.projects?.allProjects);
  const loading = useSelector((state) => state.projects?.loading);

  console.log("projects --", projects);
  console.log("projects --", loading);
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
  const handleEdit = (data) => {
    setFormData(data);
    setIsEditMode(true);
    toggleModal();
  };
  const handleSubmit = () => {
    if (isEditMode) {
      console.log("Updated Data:", formData);
    } else {
      console.log("Created Data:", formData);
    }
    toggleModal();
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Current Cost", key: "current_cost" },
    { label: "Budget", key: "budget" },
    { label: "Role", key: "role" },
  ];

  const data = projects.map((project, index) => ({
    id: index + 1,
    name: project?.project_name,
    current_cost: "₹ " + project?.current_cost,
    budget: "₹ " + project?.budget,
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
        console.log("res--" , res)
        await dispatch(getAllProjects());
      } catch (error) {
        console.error("Error deleting row:", error);
        alert("An error occurred. Please try again.");
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
