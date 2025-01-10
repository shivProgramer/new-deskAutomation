import React from "react";

const DMEAnalysisCreateUpdateModal = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          <div className="grid grid-cols-1 gap-4">
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

            {/* Note */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Note <span className="text-red-600"> * </span>
              </label>
              <textarea
                name="Note"
                value={formData.Note || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter note for analysis"
                rows="4"
                required
              />
            </div>

            {/* Added By */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Added By <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="AddedBy"
                value={formData.AddedBy || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter the user ID who added this"
                required
              />
            </div>

            {/* Added On */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Added On <span className="text-red-600"> * </span>
              </label>
              <input
                type="datetime-local"
                name="AddedOn"
                value={formData.AddedOn || ""}
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

export default DMEAnalysisCreateUpdateModal;
