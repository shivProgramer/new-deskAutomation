import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";

import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/config";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Loader from "../components/Loader";
import {
  createDalyReports,
  deleteDalyReports,
  getAllDalyReports,
  getDalyReportById,
  updateDalyReports,
} from "../redux/slice/Daly_reports_slice";
import ReportCreateUpdateModel from "../components/ReportCreateUpdateModel";

const DalyReports = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState();
  const [filterData, setFilterData] = useState();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.daly_report?.loading);
  const all_reports = useSelector((state) => state.daly_report?.allDalyReports);
  const singleReprot = useSelector((state) => state.daly_report?.singleReport);
  const [isUpdate, setIsUpdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Report_Subject: "",
    Report_Type: "",
    Email_Code: "",
    Script_Path: "",
    Occurence: "",
    Data_SP: "",
    Email_Body: "",
  });

  const initialFormData = {
    Report_Subject: "",
    Report_Type: "",
    Email_Code: "",
    Script_Path: "",
    Occurence: "",
    Data_SP: "",
    Email_Body: "",
  };

  const handleSubmit = async () => {
    if (isUpdate) {
      try {
        const res = await dispatch(
          updateDalyReports({ id: singleReprot?.ID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDalyReports());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDalyReports(formData));
        console.log("res --", res);
        if (res?.payload?.status === 1) {
          await dispatch(getAllDalyReports());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setFormData(initialFormData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFormData({
      Report_Subject: singleReprot?.Report_Subject,
      Report_Type: singleReprot?.Report_Type,
      Email_Code: singleReprot?.Email_Code,
      Script_Path: singleReprot?.Script_Path,
      Occurence: singleReprot?.Occurence,
      Data_SP: singleReprot?.Data_SP,
      Email_Body: singleReprot?.Email_Body,
    });
  }, [singleReprot]);

  const handleUpdate = async (ele) => {
    try {
      const res = await dispatch(getDalyReportById(ele?.d_id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const onClear = () => {
    setSearchTerm("");
  };
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllDalyReports());
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = all_reports.filter((ele) => {
        const Report_Type = ele?.Report_Type?.toLowerCase() || "";
        return Report_Type.includes(searchTerm.toLowerCase());
      });
      setFilterData(filtered);
    } else {
      setFilterData(all_reports);
    }
  }, [all_reports, searchTerm]);

  // for table
  const columns = [
    { label: "ID", key: "id" },
    { label: "Report Subject", key: "Report_Subject" },
    { label: "Report Type", key: "Report_Type" },
    { label: "Occurence", key: "Occurence" },
    { label: " Email Code", key: "Email_Code" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    Report_Subject: ele?.Report_Subject,
    Report_Type: ele?.Report_Type,
    Occurence: ele?.Occurence,
    Email_Code: ele?.Email_Code,
    d_id: ele?.ID,
  }));

  // for delete

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDalyReports(rowToDelete?.d_id));

        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDalyReports());
      } catch (error) {
        console.error("Error deleting row:", error);

        showToast(error, "error");
      } finally {
        setIsModalOpendelete(false);
        setRowToDelete(null);
      }
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="min-h-screen bg-gray-50 p-0 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
          {/* Left Side: Create Project Button */}
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Report
          </button>

          {/* Right Side: Search Bar with Button */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search employees..."
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
            />
            <button
              onClick={onClear}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </div>

        <DynamicTable
          columns={columns}
          data={data}
          onEdit={handleUpdate}
          onDelete={handleDelete}
        />

        <ConfirmDeleteModal
          isOpen={isModalOpendelete}
          onClose={() => setIsModalOpendelete(false)}
          onConfirm={confirmDelete}
        />

        <ReportCreateUpdateModel
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "update Report" : "Create Report"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DalyReports;
