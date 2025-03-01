import React, { useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import {
  CreateAdhocReport,
  getAllAdhocReport,
  getSpData,
} from "../redux/slice/Adhoc_Report_slice";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import AdhocReportCreateUpdateModal from "./AdhocReportCreateUpdateModal";
import { showToast } from "../utils/config";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
const MenuWithData = () => {
  const [selectedItem, setSelectedItem] = useState("Item 1");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ Name: "", SP: "" });



  // Redux selectors
  const allAdhocReport = useSelector(
    (state) => state.adhoc_report?.allAdhocReport?.data
  );
  const sp_data = useSelector((state) => state.adhoc_report?.Spdata?.data);
  const loading = useSelector((state) => state.adhoc_report?.loading);
  const dispatch = useDispatch();

  // Handlers
  const handleEdit = (row) => {
    console.log("Editing:", row);
  };

  const handleDelete = (row) => {
    console.log("Deleting:", row);
  };

  useEffect(() => {
    dispatch(getAllAdhocReport());
  }, []);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    dispatch(getSpData(itemName));
  };

  useEffect(() => {
    if (sp_data?.length > 0) {
      const dynamicColumns = Object.keys(sp_data[0]).map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
      }));
      setColumns(dynamicColumns);
      setData(sp_data);
    } else {
      setData([]);
    }
  }, [sp_data]);

  const handleSubmit = async () => {
    const res = await dispatch(CreateAdhocReport(formData));
    if (res?.payload?.message) {
      showToast(res.payload.message, "success");
      dispatch(getAllAdhocReport());
    }
    setModalOpen(false);
  };

  const exportToExcel = async () => {
    if (!sp_data || sp_data.length === 0) {
      alert("No data available to export.");
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("SP Data");

      const columns = Object.keys(sp_data[0]).map((key) => ({
        header: key,
        key: key,
        width: 20,
      }));
      worksheet.columns = columns;

      worksheet.addRows(sp_data);

      const buffer = await workbook.xlsx.writeBuffer();

      const fileName = "sp_data_report.xlsx";
      saveAs(new Blob([buffer]), fileName);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error exporting to Excel.");
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="flex flex-col bg-gray-50 z-10">
        {/* Menu Section - Grid Layout */}

        <div className="bg-gray-100 text-gray-600 p-2 rounded-b-xl shadow-lg z-10  max-w-2xl md:max-w-5xl xl:max-w-[100rem]">
          <button
            onClick={() => {
              setModalOpen(true);
              setFormData({ Name: "", SP: "" });
            }}
            className="px-4 py-1 bg-green-600 text-white rounded-md mb-4 hover:bg-green-700"
          >
            {" "}
            Create New{" "}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allAdhocReport?.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer border-t-[1px] border-green-500 px-2 py-2 rounded-lg bg-white shadow-md transition-all duration-200 ease-in-out transform ${
                  selectedItem === item.Name
                    ? "bg-yellow-50 text-blue-600"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
                onClick={() => handleItemClick(item.Name)}
              >
                {item.Name}
              </div>
            ))}
          </div>
        </div>

        {/* Data Display Section - Table Below Menu */}
        <div className="p-2 max-w-2xl md:max-w-5xl xl:max-w-[100rem]">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 ml-4">Data</h2>
            <div className="mr-4">
             {data?.length > 1 && <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-4 py-1 mb-2 rounded"
              >
                Export
              </button>}
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-lg overflow-x-auto">
            <div className="overflow-x-auto">
              <DynamicTable
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
                type="adhoc"
              />
            </div>
          </div>
        </div>

        <AdhocReportCreateUpdateModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Create Adhoc Report"
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default MenuWithData;
