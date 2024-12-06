import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import AttendanceCreateUpdateModel from "../components/AttendanceCreateUpdateModel ";
import { useDispatch, useSelector } from "react-redux";
import {
  createAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendancebyid,
  updateAttendance,
} from "../redux/slice/Attendance_slice";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import moment from "moment";

const Attendance = () => {
  // for create model ---------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    desk_employee_id: "",
    date: "",
    arrived: "",
    left: "",
    online_time: "",
    offline_time: "",
    desktime_time: "",
    at_work_time: "",
    after_work_time: "",
    before_work_time: "",
    productive_time: "",
    productivity: "",
    efficiency: "",
    work_starts: "",
    work_ends: "",
    late: false,
    is_online: false,
  });

  // fro delete state
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  //  use slectror
  const allAttendance = useSelector((state) => state.attendance?.allAttendance);
  const singleAttendance = useSelector(
    (state) => state.attendance?.singleAttendance
  );
  const loading = useSelector((state) => state.attendance?.loading);
  const allEmployee = useSelector((state) => state.employee?.allEmployee);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [filterData, setFilterData] = useState([]);
  const [filterByDate, setFilterByDate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  console.log("filterByDate ---- ", filterByDate);
  const handleOpenModal = () => {
    setAttendanceData({
      desk_employee_id: "",
      date: "",
      arrived: "",
      left: "",
      online_time: "",
      offline_time: "",
      desktime_time: "",
      at_work_time: "",
      after_work_time: "",
      before_work_time: "",
      productive_time: "",
      productivity: "",
      efficiency: "",
      work_starts: "",
      work_ends: "",
      late: false,
      is_online: false,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditModal = async (data) => {
    try {
      const res = await dispatch(getAttendancebyid(data?.e_id));
    } catch (error) {
      showToast(error, "error");
    }

    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllAttendance());
  }, []);

  useEffect(() => {
    if (userData) {
      dispatch(getAlEmployee());
    }
  }, []);
  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);
  const onClear = () => setSearchTerm("");

  useEffect(() => {
    setAttendanceData({
      desk_employee_id: singleAttendance?.desk_employee_id,
      date: singleAttendance?.date,
      arrived: singleAttendance?.arrived,
      left: singleAttendance?.left,
      online_time: singleAttendance?.online_time,
      offline_time: singleAttendance?.offline_time,
      desktime_time: singleAttendance?.desktime_time,
      at_work_time: singleAttendance?.at_work_time,
      after_work_time: singleAttendance?.after_work_time,
      before_work_time: singleAttendance?.before_work_time,
      productive_time: singleAttendance?.productive_time,
      productivity: singleAttendance?.productivity,
      efficiency: singleAttendance?.efficiency,
      work_starts: singleAttendance?.work_starts,
      work_ends: singleAttendance?.work_ends,
      late: singleAttendance?.late,
      is_online: singleAttendance?.is_online,
    });
  }, [singleAttendance]);

  const handleSubmit = async (e) => {
    if (isEditing) {
      try {
        const res = await dispatch(
          updateAttendance({
            id: singleAttendance?.id,
            newData: attendanceData,
          })
        );
        if (res?.payload) {
          await dispatch(getAllAttendance());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createAttendance(attendanceData));
        if (res?.payload) {
          await dispatch(getAllAttendance());
          showToast(res?.payload?.message, "success");
        }
      } catch (error) {
        showToast(error, "error");
      }
    }
    setIsModalOpen(false);
  };
  const handleSearchBydate = (e) => {
    const val = e.target.value;

    setFilterByDate(val);
  };

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    let filteredData = [];

    if (filterByDate) {
      filteredData = allAttendance.filter(
        (att) => moment(att.date).format("YYYY-MM-DD") === filterByDate
      );
    } else {
      filteredData = allAttendance.filter((att) =>
        moment(att.date).isSame(currentDate, "day")
      );
    }
    if (searchTerm) {
      filteredData = filteredData.filter((att) => {
        const employee = allEmployee.find(
          (emp) => emp.desk_employee_id === att.desk_employee_id
        );
        return employee?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilterData(filteredData);
  }, [allAttendance, allEmployee, searchTerm, filterByDate]);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },

    { label: "Productive Time", key: "productive_time" },
    { label: "Work Starts", key: "work_starts" },
    { label: "Work Ends", key: "work_ends" },
    { label: "Date", key: "date" },
    { label: "Is Online", key: "is_online" },
  ];

  // const formatProductiveTime = (minutes) => {
  //   if (!minutes) return "0 minutes";
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours > 0 ? `${hours} hours` : ""} ${
  //     mins > 0 ? `${mins} minutes` : ""
  //   }`.trim();
  // };

  const formatProductiveTime = (seconds) => {
    if (!seconds) return "0 minutes";
    const totalMinutes = Math.floor(seconds / 60); 
    const hours = Math.floor(totalMinutes / 60);  
    const mins = totalMinutes % 60;
    return `${hours > 0 ? `${hours} hours` : ""} ${
      mins > 0 ? `${mins} minutes` : ""
    }`.trim();
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    const date = new Date(dateTime);
    if (isNaN(date)) return "Invalid Date";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hour, minute] = timeString.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return "Invalid Time";
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    const period = isPM ? "PM" : "AM";
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const data = filterData
    ?.filter((att) => {
      const attendanceDate = new Date(att.date).toISOString().split("T")[0];
      return attendanceDate;
    })
    .map((att, index) => {
      const employee = allEmployee?.find(
        (emp) => emp.desk_employee_id === att.desk_employee_id
      );
      return {
        id: index + 1,
        name: employee ? employee.name : "N/A",
        is_online: att ? (att.is_online ? "Online" : "Offline") : "N/A",
        desk_employee_id: att.desk_employee_id,
        date: att.date,
        arrived: formatDateTime(att.arrived),
        left: formatDateTime(att.left),
        work_starts: formatTime(att.work_starts),
        work_ends: formatTime(att.work_ends),
        productivity: `${att.productivity}%`,
        efficiency: `${att.efficiency}%`,
        productive_time: formatProductiveTime(att.productive_time),
        e_id:att?.id
      };
    });


  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteAttendance(rowToDelete?.e_id));

        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        dispatch(getAllAttendance());
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
            onClick={handleOpenModal}
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Attendance
          </button>
          {/* Right Side: Search Bar with Button */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div class="">
              <div class="flex items-center space-x-4">
                <label for="date" class="text-sm font-semibold text-gray-700">
                  Select Date:
                </label>
                <input
                  type="date"
                  id="date"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  onChange={handleSearchBydate}
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                placeholder="Search attendance..."
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
              />
              <button
                onClick={onClear}
                className="px-4 py-2 ml-4 bg-red-700 hover:bg-red-800 text-white rounded-md"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <DynamicTable
          columns={columns}
          data={data}
          onEdit={handleEditModal}
          onDelete={handleDelete}
        />
        <ConfirmDeleteModal
          isOpen={isModalOpendelete}
          onClose={() => setIsModalOpendelete(false)}
          onConfirm={confirmDelete}
        />
        <AttendanceCreateUpdateModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={isEditing ? "Edit Attendance" : "Create Attendance"}
          formData={attendanceData}
          setFormData={setAttendanceData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Attendance;
