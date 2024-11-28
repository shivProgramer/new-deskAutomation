import React, { useEffect } from "react";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
import { useDispatch, useSelector } from "react-redux";

const AttendanceCreateUpdateModel = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const employees = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
  ];
  const userData = JSON.parse(localStorage.getItem("userData"));
  const allEmployee = useSelector((state) => state.employee?.allEmployee);

  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const formatTimeForInput = (isoTime) => {
    if (!isoTime) return "";
    const date = new Date(isoTime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "work_ends" || name ==="work_starts" || name === "arrived" || name ==="left") {
      
      const currentDate = new Date(); 
      const [hours, minutes] = value.split(":"); 
      const updatedTime = new Date(
        currentDate.setHours(hours, minutes, 0, 0)
      ).toISOString();

      setFormData((prev) => ({
        ...prev,
        [name]: updatedTime,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // const formatTimeForInput = (isoTime) => {
  //   if (!isoTime) return "";
  //   const date = new Date(isoTime);
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // };

  useEffect(() => {
    if (userData) {
      dispatch(getAlEmployee());
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg overflow-auto max-h-[90vh]">
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
          {/* Fields */}
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Employee</label>
              <select
                name="desk_employee_id"
                value={formData.desk_employee_id || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                required
              >
                <option value="" disabled>
                  Select an employee
                </option>
                {allEmployee?.map((employee, index) => (
                  <option key={index} value={employee?.desk_employee_id}>
                    {employee?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Select date"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Arrival Time
              </label>
              <input
                type="time"
                name="arrived"
                value={formatTimeForInput(formData.arrived)}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter arrival time"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Leave Time
              </label>
              <input
                type="time"
                name="left"
                value={formatTimeForInput(formData.left)}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter leave time"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Online Time (mins)
              </label>
              <input
                type="number"
                name="online_time"
                value={formData.online_time || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter online time in minutes"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Offline Time (mins)
              </label>
              <input
                type="number"
                name="offline_time"
                value={formData.offline_time || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter offline time in minutes"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Productive Time (mins)
              </label>
              <input
                type="number"
                name="productive_time"
                value={formData.productive_time || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter productive time in minutes"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Productivity (%)
              </label>
              <input
                type="number"
                name="productivity"
                value={formData.productivity || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter productivity percentage"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Efficiency (%)
              </label>
              <input
                type="number"
                name="efficiency"
                value={formData.efficiency || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter efficiency percentage"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Work Starts Time
              </label>
              <input
                type="time"
                name="work_starts"
                value={formatTimeForInput(formData.work_starts)}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter work start time"
                required
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Work Ends Time
              </label>
              <input
                type="time"
                name="work_ends"
                // value = {formData.work_ends}
                value={formatTimeForInput(formData.work_ends)}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter work end time"
                required
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Work Ends Time
              </label>
              <input
                type="time"
                name="work_ends"
                value={formatTimeForInput(formData.work_ends)} 
                onChange={handleInputChange} 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
                placeholder="Enter work end time"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium mb-1">Late</label>
              <input
                type="checkbox"
                name="late"
                checked={formData.late || false}
                onChange={handleInputChange}
                className="ml-2"
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium mb-1">
                Is Online
              </label>
              <input
                type="checkbox"
                name="is_online"
                checked={formData.is_online || false}
                onChange={handleInputChange}
                className="ml-2"
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
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceCreateUpdateModel;
