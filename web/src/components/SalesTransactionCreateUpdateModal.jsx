import React, { useEffect } from "react";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../redux/slice/Project_cost_slice";
import Select from "react-select";
const SalesTransactionCreateUpdateModal = ({
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
  const projects = useSelector((state) => state.projects?.allProjects);

  // Convert projects to react-select's required format
  const projectOptions = projects?.map((project) => ({
    value: project.project_name,
    label: project.project_name,
  }));

  const handleSelectChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      ProjectName: selectedOption ? selectedOption.value : "",
    }));
  };

  useEffect(() => {
    dispatch(getAlEmployee());
    dispatch(getAllProjects());
  }, []);

  console.log("projects --1111", projects);

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
            {/* Employee ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Employee <span className="text-red-600"> * </span>
              </label>
              <select
                name="EmployeeID"
                value={formData.EmployeeID || ""}
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

            {/* Sale Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Sale Date <span className="text-red-600"> * </span>
              </label>
              <input
                type="date"
                name="SaleDate"
                value={formData.SaleDate || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              />
            </div>

            {/* Sale Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Sale Value <span className="text-red-600"> * </span>
              </label>
              <input
                type="number"
                name="SaleValue"
                value={formData.SaleValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter sale value"
                required
              />
            </div>

            {/* Reward Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Reward Value
              </label>
              <input
                type="number"
                name="RewardValue"
                value={formData.RewardValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter reward value"
              />
            </div>

            {/* Sales Source */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Sales Source
              </label>
              <select
                name="SalesSource"
                value={formData.SalesSource || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
              >
                <option value="" disabled>
                  Select sales source
                </option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="India Mart Export">India Mart Export</option>
                <option value="Website">Website</option>
                <option value="India Mart">India Mart</option>
                <option value="Reference">Reference</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Division Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Division Name
              </label>
              <select
                name="DivisionName"
                value={formData.DivisionName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
              >
                <option value="" disabled>
                  Select division name
                </option>
                <option value="NOWGRAY">NOWGRAY</option>
                <option value="CA OMS">CA OMS</option>
                <option value="Brand Graphics">Brand Graphics</option>
                <option value="ECOMM11">ECOMM11</option>
              </select>
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Project Name <span className="text-red-600"> * </span>
              </label>
              <select
                name="ProjectName"
                value={formData.ProjectName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                required
              >
                <option value="" className="">
                  Select an project
                </option>
                {projects.map((project) => (
                  <option
                    key={project?.project_name}
                    value={project?.project_name}
                  >
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Project Name <span className="text-red-600"> * </span>
              </label>
              <Select
                options={projectOptions}
                onChange={handleSelectChange}
                value={
                  projectOptions.find(
                    (option) => option.value === formData.ProjectName
                  ) || null
                }
                placeholder="Select a project"
                isClearable
                className="w-full"
                classNamePrefix="react-select"
              />
            </div>

            {/* Ad Campaign Name */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-1">
                Ad Campaign Name
              </label>
              <input
                type="text"
                name="AdCampaignName"
                value={formData.AdCampaignName || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2 border"
                placeholder="Enter ad campaign name"
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
              {title.split("Transaction")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesTransactionCreateUpdateModal;
