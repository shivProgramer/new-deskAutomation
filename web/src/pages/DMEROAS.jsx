import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import DMERoasCreateUpdateModal from "../components/DMERoasCreateUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createDmeRoas,
  deleteDmeRoas,
  getAllDmeRoas,
  getDmeRoasbyid,
  updateDmeRoas,
} from "../redux/slice/Dme_Roas_slice";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const DMEROAS = () => {
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
    RevenueGenerated: 0,
    Spend: 0,
    UpdatedOn: currentDateTime,
  });

  const initialFormData = {
    CampaignID: 0,
    RevenueGenerated: 0,
    Spend: 0,
    UpdatedOn: currentDateTime,
  };

  // get data from redux to here -----------------
  const DmeRoasAllData = useSelector(
    (state) => state?.Dme_rose_stroe?.allDmeRoasData
  );

  const singledata = useSelector(
    (state) => state.Dme_rose_stroe?.singleDmeRoas
  );
  const loading = useSelector((state) => state?.Dme_rose_stroe?.loading);

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  useEffect(() => {
    setFormData({
      CampaignID: singledata?.CampaignID,
      RevenueGenerated: singledata?.RevenueGenerated,
      Spend: singledata?.Spend,
      UpdatedOn: currentDateTime,
    });
  }, [singledata]);

  // here is calling api

  useEffect(() => {
    dispatch(getAllDmeRoas());
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = DmeRoasAllData.filter((roas) => {
        const allFields = `
          ${roas?.Campaign?.Name || ""} 
          ${roas?.RevenueGenerated || ""} 
          ${roas?.Spend || ""} 
          ${roas?.UpdatedOn || ""}
          ${roas?.ROAS || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(DmeRoasAllData);
    }
  }, [searchTerm, DmeRoasAllData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmeRoas(rowToDelete?.rs_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmeRoas());
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
    let id = ele?.rs_id;
    try {
      await dispatch(getDmeRoasbyid(id));
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
          updateDmeRoas({ id: singledata?.ROASID, newData: formData })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeRoas());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmeRoas(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmeRoas());
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
    { label: "Campaign Name", key: "CampaignID" },
    { label: "Revenue Generated", key: "RevenueGenerated" },
    { label: "Spend", key: "Spend" },
    { label: "ROAS", key: "roas" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    CampaignID: ele?.Campaign?.Name || "N/A",
    RevenueGenerated: ele?.RevenueGenerated || "N/A",
    Spend: ele?.Spend || "N/A",
    roas: ele?.ROAS || "N/A",

    rs_id: ele?.ROASID,
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
