import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import DMETeamCreateUpdateModal from "../components/DMETeamCreateUpdateModal";

const DMETeam = () => {
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    CampaignID: 1,
    EmployeeID: "",
    Role: "",
    AssignedOn: new Date().toISOString().split("T")[0], // Default to current date
  });

  const initialFormData = {
    CampaignID: 1,
    EmployeeID: "",
    Role: "",
    AssignedOn: new Date().toISOString().split("T")[0],
  };

  const staticData = [
    {
      CampaignID: 1,
      EmployeeID: 101,
      Role: "Manager",
      AssignedOn: "2025-01-05",
    },
    // Add more static data as needed
  ];

  const [teamData, setTeamData] = useState(staticData);

  useEffect(() => {
    setFilterData(teamData);
  }, [teamData]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = teamData.filter((team) => {
        const allFields = `
          ${team?.EmployeeID || ""}
          ${team?.Role || ""}
          ${team?.AssignedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(teamData);
    }
  }, [searchTerm, teamData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      const updatedData = teamData.filter(
        (team) => team.EmployeeID !== rowToDelete.EmployeeID
      );
      setTeamData(updatedData);
      showToast("Team member deleted successfully", "success");
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

  const handleUpdate = (team) => {
    setFormData(team);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedData = teamData.map((team) =>
        team.EmployeeID === formData.EmployeeID ? formData : team
      );
      setTeamData(updatedData);
      showToast("Team member updated successfully", "success");
    } else {
      setTeamData([...teamData, formData]);
      showToast("Team member added successfully", "success");
    }
    closeModal();
  };

  const columns = [
    { label: "Employee ID", key: "EmployeeID" },
    { label: "Role", key: "Role" },
    { label: "Assigned On", key: "AssignedOn" },
  ];

  const data = filterData.map((team, index) => ({
    id: index + 1,
    ...team,
  }));

  return (
    <>
      <div className=" bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Create Team Member
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Team Members..."
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

        <DMETeamCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Team Member" : "Create Team Member"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMETeam;
