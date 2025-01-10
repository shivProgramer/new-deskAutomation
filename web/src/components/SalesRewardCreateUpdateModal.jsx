import React, { useEffect } from "react";

const SalesRewardCreateUpdateModal = ({
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

  useEffect(() => {
    if (formData.ValidFrom && !formData.ValidTo) {
      setFormData((prev) => ({
        ...prev,
        ValidTo: formData.ValidFrom,
      }));
    }
  }, [formData.ValidFrom, setFormData]);

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
            {/* Reward Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Reward Type <span className="text-red-600"> * </span>
              </label>
              <input
                type="text"
                name="RewardType"
                value={formData.RewardType || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter reward type"
                required
              />
            </div>
            {/* Target Percentage */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Target Percentage <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="TargetPercentage"
                value={formData.TargetPercentage || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter target percentage"
                required
              />
            </div>

            {/* Target Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Target Value <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="TargetValue"
                value={formData.TargetValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter target value"
                required
              />
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
                required
              />
            </div>

            {/* Reward Description */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-1 ">
                Reward Description
              </label>
              <textarea
                type="text"
                name="RewardDescription"
                value={formData.RewardDescription || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter reward description"
              />
            </div>

            {/* Valid From */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Valid From <span className="text-red-600"> * </span>
              </label>
              <input
                type="date"
                name="ValidFrom"
                value={formData.ValidFrom || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div>

            {/* Valid To */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Valid To <span className="text-red-600"> * </span>{" "}
              </label>
              <input
                type="date"
                name="ValidTo"
                value={formData.ValidTo || ""}
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
              {title.split("Reward")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesRewardCreateUpdateModal;
