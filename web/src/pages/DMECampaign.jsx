import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DMECampaignCreateUpdateModal from "../components/DMECampaignCreateUpdateModal";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";

const DMECampaign = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    CampaignName: "",
    Platform: "",
    Objective: "",
    StartDate: "",
    EndDate: "",
    CreatedBy: 1,
    CreatedOn: new Date().toISOString().split("T")[0],
    IsActive: true,
  });

  const initialFormData = {
    CampaignName: "",
    Platform: "",
    Objective: "",
    StartDate: "",
    EndDate: "",
    CreatedBy: 1,
    CreatedOn: new Date().toISOString().split("T")[0],
    IsActive: true,
  };

  const staticData = [
    {
      CampaignName: "New Year Sale Campaign",
      Platform: "Facebook",
      Objective: "Increase Sales",
      StartDate: "2025-01-01",
      EndDate: "2025-01-31",
      CreatedBy: 1,
      CreatedOn: "2025-01-07",
      IsActive: true,
    },
    
  ];

  const [campaignData, setCampaignData] = useState(staticData);

  useEffect(() => {
    setFilterData(campaignData);
  }, [campaignData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = campaignData.filter((campaign) => {
        const allFields = `
          ${campaign?.CampaignName || ""}
          ${campaign?.Platform || ""}
          ${campaign?.Objective || ""}
          ${campaign?.StartDate || ""}
          ${campaign?.EndDate || ""}
          ${campaign?.CreatedBy || ""}
          ${campaign?.CreatedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(campaignData);
    }
  }, [searchTerm, campaignData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = campaignData.filter(
        (campaign) => campaign.CampaignName !== rowToDelete.CampaignName
      );
      setCampaignData(updatedData);
      showToast("Campaign deleted successfully", "success");
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

  const handleUpdate = (campaign) => {
    setFormData(campaign);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = campaignData.map((campaign) =>
        campaign.CampaignName === formData.CampaignName ? formData : campaign
      );
      setCampaignData(updatedData);
      showToast("Campaign updated successfully", "success");
    } else {
      setCampaignData([...campaignData, formData]);
      showToast("Campaign created successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Campaign Name", key: "CampaignName" },
    { label: "Platform", key: "Platform" },
    { label: "Objective", key: "Objective" },
    { label: "Start Date", key: "StartDate" },
    { label: "End Date", key: "EndDate" },
    { label: "Is Active", key: "IsActive" },
  ];

  const data = filterData.map((campaign, index) => ({
    id: index + 1,
    ...campaign,
  }));

  return (
    <>
      <div className=" bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Campaign
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Campaign..."
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

        <DMECampaignCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Campaign" : "Create Campaign"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMECampaign;
