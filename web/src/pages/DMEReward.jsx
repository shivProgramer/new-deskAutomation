import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DMERewardCreateUpdateModal from "../components/DMERewardCreateUpdateModal";
import { showToast } from "../utils/config";

const DMEReward = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormData = {
    RuleName: "",
    MinROAS: 0,
    MinRevenue: 0,
    RewardType: "",
    RewardValue: 0,
    IsActive: true,
    CreatedOn: new Date().toISOString(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const staticData = [
    {
      RuleName: "Sample Reward Rule",
      MinROAS: 1.5,
      MinRevenue: 1000.0,
      RewardType: "Discount",
      RewardValue: 50.0,
      IsActive: true,
      CreatedOn: "2025-01-07T00:00:00Z",
    },
  ];

  const [rewardData, setRewardData] = useState(staticData);

  useEffect(() => {
    setFilterData(rewardData);
  }, [rewardData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = rewardData.filter((reward) => {
        const allFields = `
          ${reward?.RuleName || ""}
          ${reward?.MinROAS || ""}
          ${reward?.MinRevenue || ""}
          ${reward?.RewardType || ""}
          ${reward?.RewardValue || ""}
          ${reward?.IsActive ? "Active" : "Inactive"}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(rewardData);
    }
  }, [searchTerm, rewardData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = rewardData.filter(
        (reward) => reward.RuleName !== rowToDelete.RuleName
      );
      setRewardData(updatedData);
      showToast("Reward rule deleted successfully", "success");
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

  const handleUpdate = (reward) => {
    setFormData(reward);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = rewardData.map((reward) =>
        reward.RuleName === formData.RuleName ? formData : reward
      );
      setRewardData(updatedData);
      showToast("Reward rule updated successfully", "success");
    } else {
      setRewardData([...rewardData, formData]);
      showToast("Reward rule created successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Rule Name", key: "RuleName" },
    { label: "Min ROAS", key: "MinROAS" },
    { label: "Min Revenue", key: "MinRevenue" },
    { label: "Reward Type", key: "RewardType" },
    { label: "Reward Value", key: "RewardValue" },
    { label: "Is Active", key: "IsActive" },
  ];

  const data = filterData.map((reward, index) => ({
    id: index + 1,
    ...reward,
  }));

  return (
    <div className="bg-gray-50 p-0 md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
        <button
          onClick={openModal}
          className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
        >
          Create Reward Rule
        </button>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search Reward Rule..."
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

      <DMERewardCreateUpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isUpdate ? "Update Reward Rule" : "Create Reward Rule"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default DMEReward;
