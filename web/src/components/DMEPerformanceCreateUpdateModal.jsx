import React from "react";

const DMEPerformanceCreateUpdateModal = ({
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
          <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
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
                type="number"
                name="CampaignID"
                value={formData.CampaignID || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter campaign ID"
                required
              />
            </div>

            {/* Impressions */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Impressions <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="Impressions"
                value={formData.Impressions || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter impressions count"
                required
              />
            </div>

            {/* Clicks */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Clicks <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="Clicks"
                value={formData.Clicks || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter clicks count"
                required
              />
            </div>

            {/* Conversions */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Conversions <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="Conversions"
                value={formData.Conversions || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter conversions count"
                required
              />
            </div>

            {/* Updated On */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Updated On <span className="text-red-600"> * </span>
              </label>
              <input
                type="datetime-local"
                name="UpdatedOn"
                value={formData.UpdatedOn || ""}
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
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DMEPerformanceCreateUpdateModal;
