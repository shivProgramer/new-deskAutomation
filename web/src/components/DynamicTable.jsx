 import React, { useState } from "react";
 const DynamicTable = ({ columns, data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Rows per page

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data?.slice(indexOfFirstRow, indexOfLastRow);

  console.log("currentData" , currentData)
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
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-200 text-left">
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
            <th className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700">
              Actions
            </th>
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
                  {row[col.key]}
                </td>
              ))}
              <td className="px-4 py-2 border border-gray-200 text-sm text-gray-600">
                <div className="flex gap-2">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      

      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 ">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 ${
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
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 ${
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
