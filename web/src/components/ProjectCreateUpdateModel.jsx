import React from "react";

const ProjectCreateUpdateModel = ({
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

    if (name === "IsMonthly") {
      setFormData((prev) => ({
        ...prev,
        IsMonthly: checked,

        ...(checked && prev.start_date
          ? {
              end_date: new Date(
                new Date(prev.start_date).setDate(
                  new Date(prev.start_date).getDate() + 30
                )
              )
                .toISOString()
                .split("T")[0],
            }
          : {}),
      }));
    } else if (name === "start_date" && value) {
      const startDate = new Date(value);

      if (formData.IsMonthly) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 30);
        const formattedEndDate = endDate.toISOString().split("T")[0];

        setFormData((prev) => ({
          ...prev,
          start_date: value,
          end_date: formattedEndDate,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          start_date: value,

          end_date: prev.end_date || null,
        }));
      }
    } else if (name === "start_date" && !value) {
      setFormData((prev) => ({
        ...prev,
        start_date: null,
        end_date: null,
      }));
    } else if (name === "end_date" && !value) {
      setFormData((prev) => ({
        ...prev,
        end_date: null,
      }));
    } else if (
      ["budget", "current_cost", "actual_cost", "Paid_amount"].includes(name)
    ) {
      const formattedValue =
        value === "" || value === "-" ? 0 : parseFloat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(formattedValue) ? 0 : formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 ">
              Project Name
            </label>
            <input
              type="text"
              name="project_name"
              value={formData?.project_name || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData?.budget || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border "
              placeholder="Enter budget"
            />
          </div>

          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="">
              <label className="block text-sm font-medium mb-1">
                Current Cost
              </label>
              <input
                type="number"
                name="current_cost"
                value={formData.current_cost || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter current cost"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium mb-1">
                Paid Amount
              </label>
              <input
                type="number"
                name="Paid_amount"
                value={formData.Paid_amount || 0}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter current cost"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Actual Cost
            </label>
            <input
              type="number"
              name="actual_cost"
              value={formData.actual_cost || 0}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
              placeholder="Enter actual cost"
            />
          </div>

          <div className="flex justify-between items-center mb-4 ">
            <div className=" flex justify-start items-center">
              <label className="block text-sm font-medium mb-1">
                Critical Project
              </label>
              <input
                type="checkbox"
                name="is_critical"
                checked={formData.is_critical || false}
                onChange={handleInputChange}
                className="ml-2"
              />
            </div>

            <div className="flex justify-start items-center">
              <label className="block text-sm font-medium mb-1">
                IsMonthly
              </label>
              <input
                type="checkbox"
                name="IsMonthly"
                checked={formData.IsMonthly || false}
                onChange={handleInputChange}
                className="ml-2"
              />
            </div>
          </div>

          {/* date */}
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="">
              <label className="block text-sm font-medium mb-1">
                Start date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter start date"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium mb-1">End date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter end date"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Project Manager Emails
            </label>
            <input
              type="email"
              name="project_manager_emails"
              value={formData.project_manager_emails || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
              placeholder="Enter project manager email"
              required
            />
          </div>

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
              {title === "Update Project" ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreateUpdateModel;
