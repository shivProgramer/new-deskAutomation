import { configureStore } from '@reduxjs/toolkit';
import Auth_slice from "./slice/Auth_slice";
import Project_cost_slice from "./slice/Project_cost_slice"
import Emplopyee_slice from "./slice/Emplopyee_slice"
import Attendance_slice from "./slice/Attendance_slice"
import Hourly_rate_slice from "./slice/Hourly_rate_slice"
import Adhoc_Report_slice from "./slice/Adhoc_Report_slice"
import Daly_reports_slice from "./slice/Daly_reports_slice"
import E_comm_p_List_slice from "./slice/E_comm_p_List_slice"
import Dashboard_slice from "./slice/Dashboard_slice"
import SalesReward_slice from "./slice/SalesReward_slice"
import SalesTransaction_slice from "./slice/SalesTransaction_slice"
const store = configureStore({
  reducer: {
    auth: Auth_slice,
    projects : Project_cost_slice,
    employee: Emplopyee_slice,
    attendance:Attendance_slice,
    horuly_rate : Hourly_rate_slice,
    adhoc_report : Adhoc_Report_slice, 
    daly_report : Daly_reports_slice,
    ecomm_p_List : E_comm_p_List_slice,
    dashboard : Dashboard_slice,
    sales_reward : SalesReward_slice,
    sales_transaction : SalesTransaction_slice,
  },
});

export default store;