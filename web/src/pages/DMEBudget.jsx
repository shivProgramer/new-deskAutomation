import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DMEBudgetCreateUpdateModal from "../components/DMEBudgetCreateUpdateModal";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";

const DMEBudget = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    CampaignID: 1,
    TotalBudget: 60000,
    DailyBudget: 1200,
    CurrentSpend: 30000,
    Currency: "USD",
    UpdatedOn: "2025-01-07 12:00:00.000",
  });

  const initialFormData = {
    CampaignID: 1,
    TotalBudget: 60000,
    DailyBudget: 1200,
    CurrentSpend: 30000,
    Currency: "USD",
    UpdatedOn: "2025-01-07 12:00:00.000",
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

  const [budgetData, setBudgetData] = useState(staticData);

  useEffect(() => {
    setFilterData(budgetData);
  }, [budgetData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = budgetData.filter((budget) => {
        const allFields = `
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
      setFilterData(budgetData);
    }
  }, [searchTerm, budgetData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = budgetData.filter(
        (budget) => budget.CampaignID !== rowToDelete.CampaignID
      );
      setBudgetData(updatedData);
      showToast("Budget deleted successfully", "success");
      setIsModalOpendelete(false);
      setRowToDelete(null);
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

  const handleUpdate = (budget) => {
    setFormData(budget);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = budgetData.map((budget) =>
        budget.CampaignID === formData.CampaignID ? formData : budget
      );
      setBudgetData(updatedData);
      showToast("Budget updated successfully", "success");
    } else {
      setBudgetData([...budgetData, formData]);
      showToast("Budget created successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Campaign ID", key: "CampaignID" },
    { label: "Total Budget", key: "TotalBudget" },
    { label: "Daily Budget", key: "DailyBudget" },
    { label: "Current Spend", key: "CurrentSpend" },
    { label: "Currency", key: "Currency" },
    { label: "Updated On", key: "UpdatedOn" },
  ];

  const data = filterData.map((budget, index) => ({
    id: index + 1,
    ...budget,
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
