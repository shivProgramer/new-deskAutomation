import React, { useState } from "react";

const DynamicTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  type,
  handleStatusChange,
  onSend,
  employees,
  handleEmployeeChange,
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data?.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4 shadow-lg ">
      <table className="min-w-full border-collapse border  text-left border-l-2 border-green-500 ">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
            {type !== "adhoc" && (
              <th className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentData?.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
             

              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-2 border border-gray-200 text-sm text-gray-600"
                >
                  {type === "Ecomm_Projectlist" && col.key === "employee_id" ? (
                    <div className="flex items-center">
                      <select
                        value={row[col.key]}
                        onChange={(e) =>
                          handleEmployeeChange(row, e.target.value)
                        }
                        className="px-2 py-1 border rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {!employees.find((emp) => emp.desk_employee_id === row[col.key]) && (
                          <option value="">{`---no---`}</option>
                        )}
                        {employees.map((employee) => (
                          <option key={employee.desk_employee_id} value={employee.desk_employee_id}>
                            {employee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : col.key === "is_active" ? (
                    <button
                      onClick={() => handleStatusChange(row)}
                      className={`${
                        row.is_active === "Active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      } text-white px-4 py-1 rounded-md transition-all duration-200 ease-in-out`}
                    >
                      {row.is_active === "Active" ? "Active" : "Inactive"}
                    </button>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}

              {type !== "adhoc" && (
                <td className="px-4 py-2 border border-gray-200 text-sm text-gray-600">
                  <div className="flex gap-2">
                    {type === "Ecomm_Projectlist" ? (
                      <button
                        onClick={() => onSend(row)}
                        className="bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 px-6 py-1 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                      >
                        Send
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onEdit(row)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {currentData?.length < 1 && (
        <div className="w-full p-2">
          <h1>No Data is Available</h1>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;
