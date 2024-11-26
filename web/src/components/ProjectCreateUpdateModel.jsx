


import React from "react";

const ProjectCreateUpdateModel = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              name="project_name"
              value={formData.project_name || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3 "
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter budget"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Current Cost</label>
            <input
              type="number"
              name="current_cost"
              value={formData.current_cost || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter current cost"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Actual Cost</label>
            <input
              type="number"
              name="actual_cost"
              value={formData.actual_cost || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter actual cost"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Critical Project</label>
            <input
              type="checkbox"
              name="is_critical"
              checked={formData.is_critical || false}
              onChange={handleInputChange}
              className="ml-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Project Manager Emails
            </label>
            <input
              type="email"
              name="project_manager_emails"
              value={formData.project_manager_emails || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter project manager email"
              required
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreateUpdateModel;
