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

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
