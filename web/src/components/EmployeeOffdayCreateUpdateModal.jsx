import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";

const EmployeeOffdayCreateUpdateModal = ({
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

  useEffect(() => {
    // Add any necessary side effect, for example, if valid dates should match
  }, [formData]);

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
            {/* Desk Employee ID */}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Employee <span className="text-red-600"> * </span>
              </label>
              <select
                name="desk_employee_id"
                value={formData.desk_employee_id || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="" className="">
                  Select an employee
                </option>
                {allEmployee.map((employee) => (
                  <option
                    key={employee?.desk_employee_id}
                    value={employee?.desk_employee_id}
                  >
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Off Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Off Date <span className="text-red-600"> * </span>
              </label>
              <input
                type="date"
                name="off_date"
                value={formData.off_date || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div>

            {/* Is Covered */}
            <div className="mb-4 flex items-center space-x-2">
              <label
                htmlFor="is_covered"
                className="block text-sm font-medium text-gray-700"
              >
                Is Covered? 
              </label>
              <input
                type="checkbox"
                id="is_covered"
                name="is_covered"
                checked={formData.is_covered || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_covered: e.target.checked,
                  }))
                }
                className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
              />
            </div>

            {/* Covered Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Covered Date 
              </label>
              <input
                type="date"
                name="covered_date"
                value={formData.covered_date || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
              
              />
            </div>

            {/* Reason */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-1">Reason</label>
              <textarea
                name="reason"
                value={formData.reason || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter the reason for the off day"
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
              {title.split("Employee Offday")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeOffdayCreateUpdateModal;
