import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DMEBudgetCreateUpdateModal from "../components/DMEBudgetCreateUpdateModal";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  createDmeBudget,
  deleteDmeBudget,
  getAllDmeBudget,
  getDmeBudgetbyid,
  updateDmeBudget,
} from "../redux/slice/Dme_Budget_slice";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const DMEBudget = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const [formData, setFormData] = useState({
    CampaignID: 0,
    TotalBudget: 0,
    DailyBudget: 0,
    CurrentSpend: 0,
    Currency: "",
    UpdatedOn: currentDateTime,
  });

  const initialFormData = {
    CampaignID: 0,
    TotalBudget: 0,
    DailyBudget: 0,
    CurrentSpend: 0,
    Currency: "",
    UpdatedOn: currentDateTime,
  };

  const staticData = [
    {
      CampaignID: 1,
      TotalBudget: 60000,
      DailyBudget: 1200,
      CurrentSpend: 30000,
      Currency: "USD",
      UpdatedOn: "2025-01-07 12:00:00.000",
    },
  ];

  // get data from redux to here -----------------
  const DmeBudgetAllData = useSelector(
    (state) => state?.Dme_budget_stroe?.allDmeBudgetData
  );

  const singledata = useSelector(
    (state) => state.Dme_budget_stroe?.singleDmeBudget
  );
  const loading = useSelector((state) => state?.Dme_budget_stroe?.loading);

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  useEffect(() => {
    setFormData({
      CampaignID: singledata?.CampaignID,
      TotalBudget: singledata?.TotalBudget,
      DailyBudget: singledata?.DailyBudget,
      CurrentSpend: singledata?.CurrentSpend,
      Currency: singledata?.Currency,
      UpdatedOn: currentDateTime,
    });
  }, [singledata]);

  const [budgetData, setBudgetData] = useState(staticData);

  useEffect(() => {
    setFilterData(budgetData);
  }, [budgetData]);

  // here is calling api

  useEffect(() => {
    dispatch(getAllDmeBudget());
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = DmeBudgetAllData.filter((budget) => {
        const allFields = `
          ${budget?.DME_Campaign?.CampaignName || ""}
          ${budget?.TotalBudget || ""}
          ${budget?.DailyBudget || ""}
          ${budget?.CurrentSpend || ""}
          ${budget?.Currency || ""}
          ${budget?.UpdatedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(DmeBudgetAllData);
    }
  }, [searchTerm, DmeBudgetAllData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmeBudget(rowToDelete?.b_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmeBudget());
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
    let id = ele?.b_id;
    try {
      await dispatch(getDmeBudgetbyid(id));
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
          updateDmeBudget({ id: singledata?.BudgetID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeBudget());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmeBudget(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeBudget());
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

  const columns = [
    { label: "ID", key: "id" },
    { label: "Campaign ID", key: "CampaignID" },
    { label: "Total Budget", key: "TotalBudget" },
    { label: "Daily Budget", key: "DailyBudget" },
    { label: "Current Spend", key: "CurrentSpend" },
    { label: "Currency", key: "Currency" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    CampaignID: ele?.DME_Campaign?.CampaignName,
    TotalBudget: ele?.TotalBudget,
    DailyBudget: ele?.DailyBudget,
    CurrentSpend: ele?.CurrentSpend,
    Currency: ele?.Currency,
    b_id: ele?.BudgetID,
  }));

  return (
    <>
      <div className="bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Budget
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Budget..."
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 w-full md:w-64"
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

        <DMEBudgetCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Budget" : "Create Budget"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMEBudget;
