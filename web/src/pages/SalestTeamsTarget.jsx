import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import SalesTeamsTargetCreateUpdateModal from "../components/SalesTeamsTargetCreateUpdateModal";
import {
  createSalesTeamsTargetVal,
  deleteSalesTeamsTarget,
  getAllSalesTeamTarget,
  getSalesTeamsTargetByid,
  updateSalesTeamsTarget,
} from "../redux/slice/SalesTeamTarget_slice";
import { useDispatch, useSelector } from "react-redux";
import { getAlEmployee } from "../redux/slice/Emplopyee_slice";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";
const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};
const SalesTeamTarget = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  let user_id;
  if (userData) {
    user_id = userData?.user_id;
  }

  const [formData, setFormData] = useState({
    TargetDescription: "",
    TargetValue: 0,
    TargetType: "",
    StartDate: "",
    EndDate: "",
    CreatedBy: user_id,
    CreatedAt: currentDateTime,
    employee_id: 0,
  });

  const initialFormData = {
    TargetDescription: "",
    TargetValue: 0,
    TargetType: "Sales",
    StartDate: "",
    EndDate: "",
    CreatedBy: user_id,
    CreatedAt: currentDateTime,
    employee_id: 0,
  };


  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  const allEmployee = useSelector((state) => state.employee?.allEmployee);

  // get data from redux
  const salesTeamsTargetAllData = useSelector(
    (state) => state?.sales_team_target?.allSalesTeamTargetVal
  );

  const singledata = useSelector(
    (state) => state.sales_team_target?.singleSalesTeamsTarget
  );

  const loading = useSelector((state) => state?.sales_team_target?.loading);

  // Filtering the data based on search term
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = salesTeamsTargetAllData.filter((ele) => {
        const matchingEmployee = allEmployee.find(
          (emp) => emp?.desk_employee_id === ele.employee_id
        );
        const allFields = `
          ${ele?.TargetValue || ""}
          ${ele?.TargetType || ""}
          ${ele?.StartDate || ""}
          ${ele?.EndDate || ""}
          ${ele?.CreatedBy || ""}
          ${ele?.CreatedAt || ""}
          ${matchingEmployee?.name || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(salesTeamsTargetAllData);
    }
  }, [searchTerm, salesTeamsTargetAllData, allEmployee]);

  useEffect(() => {
    setFormData({
      TargetDescription: singledata?.TargetDescription,
      TargetValue: singledata?.TargetValue,
      TargetType: singledata?.TargetType,
      StartDate: singledata?.StartDate,
      EndDate: singledata?.EndDate,
      CreatedBy: singledata?.CreatedBy,
      CreatedAt: singledata?.CreatedAt,
      employee_id: singledata?.employee_id,
    });
  }, [singledata]);

  // api calling to here ------------------------------

  useEffect(() => {
    dispatch(getAlEmployee());
  }, []);

  useEffect(() => {
    dispatch(getAllSalesTeamTarget());
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Employee Name", key: "employee_name" },
    { label: "Target Type", key: "TargetType" },
    { label: "Target Value", key: "TargetValue" },

    { label: "Start Date", key: "StartDate" },
    { label: "End Date", key: "EndDate" },
    // { label: "Created By", key: "CreatedBy" },
    // { label: "Created At", key: "CreatedAt" },
    { label: "Target Description", key: "TargetDescription" },
  ];

  const data = filterData?.map((ele, index) => {
    const matchingEmployee = allEmployee.find(
      (emp) => emp?.desk_employee_id === ele.employee_id
    );

    return {
      id: index + 1,
      TargetDescription: ele?.TargetDescription || "N/A",
      TargetValue: ele?.TargetValue || "N/A",
      TargetType: ele?.TargetType || "N/A",
      StartDate: ele?.StartDate || "N/A",
      EndDate: ele?.EndDate || "N/A",
      CreatedBy: ele?.CreatedBy || "N/A",
      CreatedAt: ele?.CreatedAt || "N/A",
      employee_name: matchingEmployee?.name || "N/A",
      target_id: ele?.TargetID,
    };
  });

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

 

  const confirmDelete = async () => {
 
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteSalesTeamsTarget(rowToDelete?.target_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        dispatch(getAllSalesTeamTarget());
      } catch (error) {
        showToast(error, "error");
      } finally {
        setIsModalOpendelete(false);
        setRowToDelete(null);
      }
    }
  };


  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setFormData(initialFormData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (ele) => {
    let id = ele?.target_id;
    try {
      await dispatch(getSalesTeamsTargetByid(id));
    } catch (error) {
      showToast(error, "error");
    }
    setIsUpdate(true);
    setIsModalOpen(true);
  };


  const handleSubmit = async () => {
    if (isUpdate) {
      try {
        const res = await dispatch(
          updateSalesTeamsTarget({
            id: singledata?.TargetID,
            newData: formData,
          })
        );

        if (res?.payload?.status === 1) {
          await dispatch(getAllSalesTeamTarget());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createSalesTeamsTargetVal(formData));

        if (res?.payload?.status === 1) {
          await dispatch(getAllSalesTeamTarget());
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

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="min-h-screenp-0 md:p-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md ">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-green-600 hover:bg-green-600 text-white rounded-md mb-2 md:mb-0"
          >
            Create Target
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Sales Team Target..."
              className="px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
            />
            <button
              onClick={onClear}
              className="px-4 py-1 bg-red-700 hover:bg-red-800 text-white rounded-md"
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

        <SalesTeamsTargetCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Target" : "Create Target"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default SalesTeamTarget;
