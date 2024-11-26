import React from "react";

const EmployeeCreateUpdateModel = ({
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
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter employee name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter employee email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Group ID</label>
            <input
              type="number"
              name="group_id"
              value={formData.group_id || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter group ID"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <input
              type="text"
              name="group_name"
              value={formData.group_name || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter group name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profile URL</label>
            <input
              type="text"
              name="profile_url"
              value={formData.profile_url || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter profile URL"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="number"
              name="user_id"
              value={formData.user_id || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter user ID"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter password"
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

export default EmployeeCreateUpdateModel;
