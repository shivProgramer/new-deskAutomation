import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import {
  getAllEcomm_project_List,
  sendReportInReporting,
  updateStatusEcomm,
} from "../redux/slice/E_comm_p_List_slice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/config";

const Ecomm_Projectlist = () => {
  const [isChecked, setIsChecked] = useState(false);

  const allECommProject = useSelector(
    (state) => state.ecomm_p_List?.allCommPList?.data
  );
   const loading = useSelector((state) => state.ecomm_p_List?.loading);
  const dispatch = useDispatch();
  console.log("allECommProject ---", allECommProject);

  useEffect(() => {
    dispatch(getAllEcomm_project_List());
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email Code", key: "email_code" },
    { label: "Is Active", key: "is_active" },
    { label: "Employee ID", key: "employee_id" },
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

    if (newData) {
      console.log("lkdjflsa");
    }
    try {
      const res = await dispatch(sendReportInReporting(newData));
      if (res?.payload?.message) {
        showToast(res.payload.message, "success");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      {/* <div className="bg-white rounded-lg shadow-md p-2 md:mx-10 md:mt-3  w-80 md:w-96">
        <h1 className="text-lg font-semibold mb-4 text-center text-gray-700">
          E-commerce Project List
        </h1>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2 w-5 h-5 text-[#1F2937] bg-[#1F2937] border-gray-300 rounded focus:ring-[#171f2b]"
            />
            Select Item
          </label>
        </div>
        <button
          onClick={handleSend}
          className="w-full bg-[#1F2937] hover:bg-[#1F2937] text-white py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all"
        >
          Send List
        </button>
      </div> */}

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
        handleStatusChange={handleStatusChange}
        onSend={onSend}
      />
    </>
  );
};

export default Ecomm_Projectlist;
