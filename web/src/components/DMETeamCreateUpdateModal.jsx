import React from "react";

const DMETeamCreateUpdateModal = ({
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
          <h2 className="text-xl font-semibold text-green-600">{title}</h2>
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
          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campaign ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Campaign ID <span className="text-red-600"> * </span>
              </label>
              <input
                type="text"
                name="CampaignID"
                value={formData.CampaignID || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter campaign ID"
                required
              />
            </div>

            {/* Employee ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Employee ID <span className="text-red-600"> * </span>
              </label>
              <input
                type="text"
                name="EmployeeID"
                value={formData.EmployeeID || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter employee ID"
                required
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Role <span className="text-red-600"> * </span>
              </label>
              <select
                name="Role"
                value={formData.Role || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Executive">Executive</option>
                <option value="Assistant">Assistant</option>
              </select>
            </div>

            {/* Assigned Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Assigned Date <span className="text-red-600"> * </span>
              </label>
              <input
                type="date"
                name="AssignedOn"
                value={formData.AssignedOn || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-4 mt-4">
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
              {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DMETeamCreateUpdateModal;
