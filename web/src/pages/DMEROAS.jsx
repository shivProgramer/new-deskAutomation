import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import DMERoasCreateUpdateModal from "../components/DMERoasCreateUpdateModal";

const DMEROAS = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    CampaignID: "",
    RevenueGenerated: "",
    Spend: "",
    UpdatedOn: new Date().toISOString().split("T")[0],
  });

  const initialFormData = {
    CampaignID: "",
    RevenueGenerated: "",
    Spend: "",
    UpdatedOn: new Date().toISOString().split("T")[0],
  };

  const staticData = [
    {
      CampaignID: 1,
      RevenueGenerated: 10000.00,
      Spend: 5000.00,
      UpdatedOn: "2025-01-07 10:00:00.000",
    },
  ];

  const [roasData, setRoasData] = useState(staticData);

  useEffect(() => {
    setFilterData(roasData);
  }, [roasData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = roasData.filter((roas) => {
        const allFields = `
          ${roas?.CampaignID || ""}
          ${roas?.RevenueGenerated || ""}
          ${roas?.Spend || ""}
          ${roas?.UpdatedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(roasData);
    }
  }, [searchTerm, roasData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = roasData.filter((roas) => roas.CampaignID !== rowToDelete.CampaignID);
      setRoasData(updatedData);
      showToast("ROAS data deleted successfully", "success");
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

  const handleUpdate = (roas) => {
    setFormData(roas);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = roasData.map((roas) =>
        roas.CampaignID === formData.CampaignID ? formData : roas
      );
      setRoasData(updatedData);
      showToast("ROAS data updated successfully", "success");
    } else {
      setRoasData([...roasData, formData]);
      showToast("ROAS data created successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Campaign ID", key: "CampaignID" },
    { label: "Revenue Generated", key: "RevenueGenerated" },
    { label: "Spend", key: "Spend" },
    { label: "Updated On", key: "UpdatedOn" },
  ];

  const data = filterData.map((roas, index) => ({
    id: index + 1,
    ...roas,
  }));

  return (
    <>
      <div className=" bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create ROAS Data
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search ROAS..."
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

        <DMERoasCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update ROAS Data" : "Create ROAS Data"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMEROAS;
