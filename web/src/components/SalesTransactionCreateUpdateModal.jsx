import React from "react";

const SalesTransactionCreateUpdateModal = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!isOpen) return null;
  const employees = [
    { EmployeeID: 1, EmployeeName: "John Doe" },
    { EmployeeID: 2, EmployeeName: "Jane Smith" },
    // Add more employees as needed
  ];
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
            {/* Employee ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Employee</label>
              <select
                name="EmployeeID"
                value={formData.EmployeeID || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="" className="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.EmployeeID} value={employee.EmployeeID}>
                    {employee.EmployeeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Sale Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Sale Date
              </label>
              <input
                type="date"
                name="SaleDate"
                value={formData.SaleDate || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div>

            {/* Sale Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Sale Value
              </label>
              <input
                type="number"
                name="SaleValue"
                value={formData.SaleValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter sale value"
                required
              />
            </div>

            {/* Reward Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Reward Value
              </label>
              <input
                type="number"
                name="RewardValue"
                value={formData.RewardValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter reward value"
                required
              />
            </div>

            {/* Sales Source */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Sales Source
              </label>
              <input
                type="text"
                name="SalesSource"
                value={formData.SalesSource || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter sales source"
                required
              />
            </div>
              {/* Division Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Division Name
              </label>
              <input
                type="text"
                name="DivisionName"
                value={formData.DivisionName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter division name"
                required
              />
            </div>


            {/* Project Name */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-1">
                Project Name
              </label>
              <input
                type="text"
                name="ProjectName"
                value={formData.ProjectName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter project name"
                required
              />
            </div>

            {/* Ad Campaign Name */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-1">
                Ad Campaign Name
              </label>
              <input
                type="text"
                name="AdCampaignName"
                value={formData.AdCampaignName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter ad campaign name"
                required
              />
            </div>

          
            

            {/* Created At */}
            {/* <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Created At</label>
              <input
                type="datetime-local"
                name="CreatedAt"
                value={formData.CreatedAt || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div> */}
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
              {title.split("Transaction")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesTransactionCreateUpdateModal;
