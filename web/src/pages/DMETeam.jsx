import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import DMETeamCreateUpdateModal from "../components/DMETeamCreateUpdateModal";
import Loader from "../components/Loader";
import {
  createDmeTeam,
  deleteDmeTeam,
  getAllDmeTeam,
  getDmeTeambyid,
  updateDmeTeam,
} from "../redux/slice/Dme_Team_slice";
import { useDispatch, useSelector } from "react-redux";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const DMETeam = () => {
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
    EmployeeID: "",
    Role: "",
    AssignedOn: currentDateTime,
  });

  const initialFormData = {
    CampaignID: 0,
    EmployeeID: 0,
    Role: 0,
    AssignedOn: currentDateTime,
  };


  // get data from redux to here -----------------
  const DmeTeamAllData = useSelector(
    (state) => state?.Dme_team_stroe?.allDmeTeamData
  );

  const singledata = useSelector(
    (state) => state.Dme_team_stroe?.singleDmeTeam
  );

  const loading = useSelector((state) => state?.Dme_team_stroe?.loading);



  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);


  useEffect(() => {
    setFormData({
      CampaignID: singledata?.CampaignID,
      EmployeeID: singledata?.EmployeeID,
      Role: singledata?.Role,
      AssignedOn: singledata?.AssignedOn,
    });
  }, [singledata]);

  // here is calling api

  useEffect(() => {
    dispatch(getAllDmeTeam());
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = DmeTeamAllData.filter((team) => {
        const allFields = `
          ${team?.EmployeeName || ""}
          ${team?.Role || ""}
          ${team?.CampaignName || ""}
        `.toLowerCase();
        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(DmeTeamAllData);
    }
  }, [searchTerm, DmeTeamAllData]);
  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmeTeam(rowToDelete?.team_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmeTeam());
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
    let id = ele?.team_id;
    try {
      await dispatch(getDmeTeambyid(id));
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
          updateDmeTeam({ id: singledata?.TeamID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeTeam());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmeTeam(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeTeam());
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
    { label: "Id", key: "id" },
    { label: "Employee Name", key: "EmployeeID" },
    { label: "Role", key: "Role" },
    { label: "Compaign Name", key: "CampaignID" },
    // { label: "Assigned On", key: "AssignedOn" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    CampaignID: ele?.CampaignName || "N/A",
    EmployeeID: ele?.EmployeeName || "N/A",
    Role: ele?.Role || "N/A",
    team_id: ele?.TeamID,
  }));
  return (
    <>
      {loading && <Loader loading={loading} />}
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
