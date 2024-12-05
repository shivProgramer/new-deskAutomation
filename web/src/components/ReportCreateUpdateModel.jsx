import React from "react";

const ReportCreateUpdateModel = ({
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Report Subject</label>
            <input
              type="text"
              name="Report_Subject"
              value={formData.Report_Subject || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter report subject"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <input
              type="text"
              name="Report_Type"
              value={formData.Report_Type || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter report type"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Code</label>
            <input
              type="number"
              name="Email_Code"
              value={formData.Email_Code || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter email code"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Script Path</label>
            <input
              type="text"
              name="Script_Path"
              value={formData.Script_Path || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter script path"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Occurrence</label>
            <input
              type="number"
              name="Occurence"
              value={formData.Occurence || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter occurrence"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Data SP</label>
            <input
              type="text"
              name="Data_SP"
              value={formData.Data_SP || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter data SP"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Body</label>
            <textarea
              name="Email_Body"
              value={formData.Email_Body || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-3"
              placeholder="Enter email body"
              rows="4"
              required
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
             { title.split("Report")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCreateUpdateModel;
