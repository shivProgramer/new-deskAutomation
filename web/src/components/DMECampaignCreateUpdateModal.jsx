import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
const DMECampaignCreateUpdateModal = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();

  const allEmployee = useSelector((state) => state.employee?.allEmployee);
  useEffect(() => {
    dispatch(getAlEmployee());
  }, []);

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

          <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Employee  <span className="text-red-600"> * </span></label>
              <select
                name="employee_id"
                value={formData.employee_id || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="">Select</option>
                {allEmployee.map((employee) => (
                  <option
                    key={employee.desk_employee_id}
                    value={employee.desk_employee_id}
                  >
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Campaign Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Campaign Name <span className="text-red-600"> * </span>
              </label>
              <input
                type="text"
                name="CampaignName"
                value={formData.CampaignName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter campaign name"
                required
              />
            </div>

            {/* Platform */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Platform <span className="text-red-600"> * </span>
              </label>
              <select
                name="Platform"
                value={formData.Platform || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="">Select</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Google Ads">Google Ads</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>

            {/* Objective */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Objective
              </label>
              <input
                type="text"
                name="Objective"
                value={formData.Objective || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter objective"
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Start Date <span className="text-red-600"> * </span>
              </label>
              <input
                type="date"
                name="StartDate"
                value={formData.StartDate || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                End Date <span className="text-red-600"> * </span>
              </label>
              <input
                type="date"
                name="EndDate"
                value={formData.EndDate || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
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

export default DMECampaignCreateUpdateModal;
