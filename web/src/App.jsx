import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Project from "./pages/Project";
import Employee from "./pages/Employee";
import Attendance from "./pages/Attendance";
import Hourly_Rate from "./pages/Hourly_Rate";
import Login from "./pages/login";
import Reg from "./pages/Reg";
import ProtectedRoute from "./components/ProtectedRoute";
import Adhoc_Report from "./pages/Adhoc_Report";
import DalyReports from "./pages/DalyReports";
import Ecomm_Projectlist from "./pages/Ecomm_Projectlist";
import Dashboard from "./pages/Dashboard";
import SalesReward from "./pages/SalesReward";
import SalesTransaction from "./pages/SalesTransaction";
import SalestTeamsTarget from "./pages/SalestTeamsTarget";
import DME from "./pages/DME";
import Employee_Offdays from "./pages/Employee_Offdays";
import Holidays from "./pages/Holidays";


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/project",
          element: <Project />,
        },
        {
          path: "/employee",
          element: <Employee />,
        },
        {
          path: "/attendance",
          element: <Attendance />,
        },
        {
          path: "/hourly-rate",
          element: <Hourly_Rate />,
        },
        {
          path: "/adhoc-report",
          element: <Adhoc_Report />,
        },
        {
          path: "/daly_reports",
          element: <DalyReports />,
        },
        {
          path: "/project-list",
          element: <Ecomm_Projectlist />,
        },
        {
          path: "/sales/reward",
          element: <SalesReward />,
        },
        {
          path: "/sales/transaction",
          element: <SalesTransaction />,
        },
        {
          path: "/sales/teams-target",
          element: <SalestTeamsTarget />,
        },
        {
          path: "/dme",
          element: <DME />,
        },
        {
          path: "/employee_offdays",
          element: <Employee_Offdays />,
        },
        {
          path: "/holidays",
          element: <Holidays />,
        },
       
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Reg />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
