import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import HolidaysCreateUpdateModal from "../components/HolidayCreateUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createHolidays,
  deleteHolidays,
  getAllHolidays,
  getHolidaysbyid,
  updateHolidays,
} from "../redux/slice/Holidays_slice";
import { showToast } from "../utils/config";

const Holidays = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    holiday_date: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const holidaysAllData = useSelector(
    (state) => state?.Holidays_store?.allHolidaysData
  );
  const singleHoliday = useSelector(
    (state) => state?.Holidays_store?.singleHolidays
  );

  const loading = useSelector((state) => state?.Holidays_store?.loading);

  const initialFormData = {
    holiday_date: "",
    description: "",
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
    dispatch(getAllHolidays());
  }, [dispatch]);

  useEffect(() => {
    setFormData({
      holiday_date: singleHoliday?.holiday_date,
      description: singleHoliday?.description,
    });
  }, [singleHoliday]);

  const handleUpdate = async (holiday) => {
    try {
      await dispatch(getHolidaysbyid(holiday.h_id));
      setIsUpdate(true);
      setIsModalOpen(true);
    } catch (error) {
      showToast(error.message, "error");
    }
  };
  const handleSubmit = async () => {
    if (isUpdate) {
      try {
        const res = await dispatch(
          updateHolidays({ id: singleHoliday?.id, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllHolidays());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createHolidays(formData));

        if (res?.payload?.status === 1) {
          await dispatch(getAllHolidays());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    closeModal();
  };

  const confirmDelete = async () => {
    try {
      const res = await dispatch(deleteHolidays(holidayToDelete?.h_id));
      if (res?.payload) {
        showToast(res?.payload?.message, "success");
      }
      await dispatch(getAllHolidays());
      setIsModalOpendelete(false);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDelete = (holiday) => {
    setHolidayToDelete(holiday);
    setIsModalOpendelete(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredData = holidaysAllData?.filter(
    (holiday) =>
      holiday?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday?.holiday_date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { label: "ID", key: "id" },
    { label: "Date", key: "holiday_date" },
    { label: "Description", key: "description" },
  ];

  const data = filteredData?.map((holiday, index) => ({
    id: index + 1,
    holiday_date: holiday?.holiday_date || "N/A",
    description: holiday?.description || "N/A",
    h_id: holiday?.id,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-0 md:p-8">
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md"
        >
          Add Holiday
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by date or description"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={clearSearch}
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

      <HolidaysCreateUpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isUpdate ? "Update Holiday" : "Create Holiday"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Holidays;
