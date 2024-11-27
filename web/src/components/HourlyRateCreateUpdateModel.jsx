import React from "react";

const HourlyRateCreateUpdateModel = ({
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
    
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Employee Name</label>
            <input
              type="text"
              name="employee_name"
              value={formData.employee_name || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter employee name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bill Rate</label>
            <input
              type="number"
              name="bill_rate"
              value={formData.bill_rate || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter bill rate"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pay Rate</label>
            <input
              type="number"
              name="pay_rate"
              value={formData.pay_rate || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter pay rate"
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
              {title.includes("Update") ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HourlyRateCreateUpdateModel;
