import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";

import HourlyRateCreateUpdateModel from "../components/HourlyRateCreateUpdateModel";
import {
  createHourlyRate,
  deleteHourlyRate,
  getAllEmployeHourly,
  getHourlyRateByid,
  updateHorulyRate,
} from "../redux/slice/Hourly_rate_slice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/config";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Loader from "../components/Loader";

const Hourly_Rate = () => {
  // for create model ---------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employee_name: "",
    bill_rate: "",
    pay_rate: "",
  });

  // for delete
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  console.log("formData --", formData);
  const [isUpdate, setIsUpdate] = useState(false); // To track if it's an update or create action
  const [searchTerm, setSearchTerm] = useState();
  const [filterData, setFilterData] = useState();
  const initialFormData = {
    employee_name: "",
    bill_rate: "",
    pay_rate: "",
  };

  const dispatch = useDispatch();

  // use selector -----------

  const hourlyRatedat = useSelector((state) => state.horuly_rate?.allEmpHoruly);
  const singledata = useSelector((state) => state.horuly_rate?.singleHoruly);
  const loading = useSelector((state) => state.horuly_rate?.loading);

  console.log("singledata --", singledata);
  // Handle opening the modal for creating a new hourly rate
  const handleOpen = () => {
    setFormData(initialFormData); // Reset form data
    setIsUpdate(false); // Indicate "Create" mode
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
    if (isUpdate) {
      try {
        const res = await dispatch(
          updateHorulyRate({ id: singledata?.employee_id, newData: formData })
        );
        if (res?.payload) {
          await dispatch(getAllEmployeHourly());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createHourlyRate(formData));
        if (res?.payload) {
          await dispatch(getAllEmployeHourly());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    handleModalClose();
  };



  useEffect(() => {
    dispatch(getAllEmployeHourly());
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = hourlyRatedat.filter((ele) => {
        const name = ele?.employee_name?.toLowerCase() || "";
        return name.includes(searchTerm.toLowerCase());
      });
      setFilterData(filtered);
    } else {
      setFilterData(hourlyRatedat);
    }
  }, [hourlyRatedat, searchTerm]);

  // for table
  const columns = [
    { label: "ID", key: "id" },
    { label: "Employee Name", key: "employee_name" },
    { label: "Bill Rate", key: "bill_rate" },
    { label: " Pay Rate", key: "pay_rate" },
  ];

  const data = filterData?.map((hrRate, index) => ({
    id: index + 1,
    employee_name: hrRate?.employee_name,
    bill_rate: "₹ " + hrRate?.bill_rate,
    pay_rate: "₹ " + hrRate?.pay_rate,
    hr_id: hrRate?.employee_id,
  }));

  const handleUpdate = async (hourlyRate) => {
    try {
      const res = await dispatch(getHourlyRateByid(hourlyRate?.hr_id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setFormData({
      employee_name: singledata?.employee_name,
      bill_rate: singledata?.pay_rate,
      pay_rate: singledata?.bill_rate,
    });
  }, [singledata]);

  // for delete

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteHourlyRate(rowToDelete?.hr_id));

        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllEmployeHourly());
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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-md shadow-md">
          {/* Left Side: Create Project Button */}
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Hourly
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

        <HourlyRateCreateUpdateModel
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={isUpdate ? "Update Hourly Rate" : "Create Hourly Rate"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Hourly_Rate;
