import React from "react";

const HolidayCreateUpdateModal = ({
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
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
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
          {/* Holiday Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Holiday Date <span className="text-red-600"> * </span>
            </label>
            <input
              type="date"
              name="holiday_date"
              value={formData.holiday_date || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-600"> * </span>
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
              placeholder="Enter description"
              required
            />
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

export default HolidayCreateUpdateModal;
