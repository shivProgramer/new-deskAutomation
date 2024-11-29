import React from "react";

const EmployeeCreateUpdateModel = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
  isEditMode,
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
      <div className="bg-white rounded-lg w-full max-w-lg md:max-w-xl p-4 md:p-6 shadow-lg mx-4 sm:mx-6 lg:mx-0 relative">
        <div
          className="max-h-[80vh] overflow-y-auto"
          style={{
            scrollbarWidth: "bold",
            scrollbarColor: "rgba(0, 0, 0, 0.1) transparent",
          }}
        >
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
            <h2 className="text-lg md:text-xl font-semibold text-green-600">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none text-lg"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
           {!isEditMode && <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Desk Employee ID
              </label>
              <input
                type="number" 
                name="desk_employee_id"
                value={formData.desk_employee_id || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 md:p-3"
                placeholder="Enter employee ID"
                required
              />
            </div>}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 md:p-3"
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
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 md:p-3"
                placeholder="Enter employee email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Group Name
              </label>
              <input
                type="text"
                name="group_name"
                value={formData.group_name || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 md:p-3"
                placeholder="Enter group name"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm md:text-base"
              >
                {isEditMode ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreateUpdateModel;
