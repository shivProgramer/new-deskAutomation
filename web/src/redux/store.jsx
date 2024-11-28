import { configureStore } from '@reduxjs/toolkit';
import Auth_slice from "./slice/Auth_slice";
import Project_cost_slice from "./slice/Project_cost_slice"
import Emplopyee_slice from "./slice/Emplopyee_slice"
import Attendance_slice from "./slice/Attendance_slice"
import Hourly_rate_slice from "./slice/Hourly_rate_slice"
import Adhoc_Report_slice from "./slice/Adhoc_Report_slice"
const store = configureStore({
  reducer: {
    auth: Auth_slice,
    projects : Project_cost_slice,
    employee: Emplopyee_slice,
    attendance:Attendance_slice,
    horuly_rate : Hourly_rate_slice,
    adhoc_report : Adhoc_Report_slice
  },
});

export default store;