import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
const ProjectTasksEmployeeCreateUpdateModel = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  const dispatch = useDispatch();
  const allEmployee = useSelector((state) => state?.employee?.allEmployee);

  useEffect(() => {
    dispatch(getAlEmployee());
  }, [dispatch]);

  if (!isOpen) return null;

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Format Due_Date before passing to the input
  const formattedDueDate = formData.Due_Date
    ? formatDate(formData.Due_Date)
    : "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-600">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Task ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Task ID <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="Task_ID"
                value={formData.Task_ID || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
                required
              />
            </div>

            {/* Employee ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Employee <span className="text-red-600"> * </span>
              </label>
              <select
                name="Employee_ID"
                value={formData.Employee_ID || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="">Select</option>
                {allEmployee?.map((employee) => (
                  <option
                    key={employee.desk_employee_id}
                    value={employee.desk_employee_id}
                  >
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="Due_Date"
                value={formattedDueDate}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
              />
            </div>

            {/* Priority */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Priority <span className="text-red-600"> * </span>
              </label>
              <select
                name="Priority"
                value={formData.Priority || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
                required
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Status <span className="text-red-600"> * </span>
              </label>
              <select
                name="Status"
                value={formData.Status || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Is Closed */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="IsClosed"
                checked={formData.IsClosed || false}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">Is Closed</label>
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

export default ProjectTasksEmployeeCreateUpdateModel;
