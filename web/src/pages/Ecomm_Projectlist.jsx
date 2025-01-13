import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import {
  EcommUpdateEmployee,
  getAllEcomm_project_List,
  sendReportInReporting,
  updateStatusEcomm,
} from "../redux/slice/E_comm_p_List_slice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/config";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
import Loader from "../components/Loader";

const Ecomm_Projectlist = () => {
  const [isChecked, setIsChecked] = useState(false);
  const allECommProject = useSelector(
    (state) => state.ecomm_p_List?.allCommPList?.data
  );
  const loading = useSelector((state) => state.ecomm_p_List?.loading);
  const allEmployee = useSelector((state) => state.employee?.allEmployee);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllEcomm_project_List());
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email Code", key: "email_code" },
    { label: "Is Active", key: "is_active" },
    { label: "Employee ", key: "employee_id" },
    { label: "Last Date Reported", key: "last_date_reported" },
  ];

  const data = allECommProject?.map((ele, index) => ({
    project_id: ele.project_id,
    id: index + 1,
    name: ele.name,
    email_code: ele.email_code,
    is_active: ele.is_active ? "Active" : "Inactive",
    report_sent_by_type: ele.report_sent_by_type,
    report_sent_by_name: ele.report_sent_by_name,
    employee_id: ele.employee_id,
    last_date_reported: ele.last_date_reported,
  }));

  const handleStatusChange = async (row) => {
    let p_id = row.project_id;
    if (p_id) {
      await dispatch(updateStatusEcomm(p_id));
      dispatch(getAllEcomm_project_List());
    }
  };

  const onSend = async (row) => {
    // Create the new data object
    let newData = {
      project_id: row.project_id,
      last_date_reported: row.last_date_reported,
      report_sent_by_name: row.report_sent_by_name,
      report_sent_by_type: row.report_sent_by_type,
      employee_id: row.employee_id,
    };

    
    try {
      const res = await dispatch(sendReportInReporting(newData));
      if (res?.payload?.message) {
        showToast(res.payload.message, "success");
        dispatch(getAllEcomm_project_List());
      }
      const result = await response.json();
    
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleEmployeeChange = async (row, newEmployeeId) => {

    let newData = {
      employee_id: newEmployeeId || 0,
    };
    let project_id = row.project_id;
    if (newData && project_id) {
      const res = await dispatch(
        EcommUpdateEmployee({ project_id: project_id, newData: newData })
      );
      dispatch(getAllEcomm_project_List());
      if (res?.payload?.message) {
        showToast(res?.payload?.message, "success");
      }
    }
    const selectedEmployee = allEmployee.find(
      (emp) => emp.desk_employee_id === parseInt(newEmployeeId, 10)
    );
   
  };

  useEffect(() => {
    dispatch(getAlEmployee());
  }, []);

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className=" p-2 md:p-4  ">
        <h1 className="font-medium text-2xl text-gray-600 ">
          {" "}
          E-commerce Project List{" "}
        </h1>
      </div>
      
      <DynamicTable
        columns={columns}
        data={data}
        type="Ecomm_Projectlist"
        employees={allEmployee}
        handleEmployeeChange={handleEmployeeChange}
        handleStatusChange={handleStatusChange}
        onSend={onSend}
      />
    </>
  );
};

export default Ecomm_Projectlist;
