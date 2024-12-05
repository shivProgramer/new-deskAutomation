



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
