import React from "react";

const DMERewardCreateUpdateModal = ({
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
            {/* Rule Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Rule Name <span className="text-red-600"> * </span>
              </label>
              <input
                type="text"
                name="RuleName"
                value={formData.RuleName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter rule name"
                required
              />
            </div>

            {/* Minimum ROAS */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Minimum ROAS <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="MinROAS"
                value={formData.MinROAS || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter minimum ROAS"
                step="0.01"
                required
              />
            </div>

            {/* Minimum Revenue */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Minimum Revenue <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="MinRevenue"
                value={formData.MinRevenue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter minimum revenue"
                step="0.01"
                required
              />
            </div>

            {/* Reward Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Reward Type <span className="text-red-600"> * </span>
              </label>
              <select
                name="RewardType"
                value={formData.RewardType || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="">Select</option>
                <option value="Discount">Discount</option>
                <option value="Cashback">Cashback</option>
                <option value="Gift">Gift</option>
              </select>
            </div>

            {/* Reward Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Reward Value <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="RewardValue"
                value={formData.RewardValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter reward value"
                step="0.01"
                required
              />
            </div>

            {/* Is Active */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="IsActive"
                checked={formData.IsActive || false}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">Is Active</label>
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

export default DMERewardCreateUpdateModal;
