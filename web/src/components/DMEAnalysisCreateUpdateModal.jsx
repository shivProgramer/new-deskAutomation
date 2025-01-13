import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDmeCompaign } from "../redux/slice/Dme_Compaign_slice";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";

const DMEAnalysisCreateUpdateModal = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const DmeCompaginAllData = useSelector(
    (state) => state?.Dme_compaign_store?.allDmeCompaignData
  );
  const allEmployee = useSelector((state) => state.employee?.allEmployee);

  useEffect(() => {
    dispatch(getAlEmployee());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDmeCompaign());
  }, []);

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
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Campaign Name <span className="text-red-600"> * </span>
              </label>
              <select
                name="CampaignID"
                value={parseInt(formData.CampaignID)}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
                required
              >
                <option value="">Select</option>
                {DmeCompaginAllData.map((dme) => (
                  <option key={dme.CampaignID} value={dme.CampaignID}>
                    {dme.CampaignName}
                  </option>
                ))}
              </select>
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
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
                placeholder="Enter note for analysis"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Added By <span className="text-red-600"> * </span>
              </label>
              <select
                name="AddedBy"
                value={formData.AddedBy || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 p-2 border"
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

export default DMEAnalysisCreateUpdateModal;
