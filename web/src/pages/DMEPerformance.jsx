import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { showToast } from "../utils/config";
import Loader from "../components/Loader";
import DMEPerformanceCreateUpdateModal from "../components/DMEPerformanceCreateUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createDmePerformance,
  deleteDmePerformance,
  getAllDmePerformance,
  getDmePerformancebyid,
  updateDmePerformance,
} from "../redux/slice/DmePerformance_slice";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const DMEPerformance = () => {
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
    Impressions: 0,
    Clicks: 0,
    Conversions: 0,
    UpdatedOn: currentDateTime,
  });
  const initialFormData = {
    CampaignID: 0,
    Impressions: 0,
    Clicks: 0,
    Conversions: 0,
    UpdatedOn: currentDateTime,
  };

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  // get data from redux to here -----------------
  const DmeCompaginAllData = useSelector(
    (state) => state?.Dme_performance_stroe?.allDmePerformanceData
  );

  
  const singledata = useSelector(
    (state) => state.Dme_performance_stroe?.singleDmePerfromance
  );

  const loading = useSelector((state) => state?.Dme_performance_stroe?.loading);

  // start to call api to here
  useEffect(() => {
    dispatch(getAllDmePerformance());
  }, []);

  useEffect(() => {
    setFormData({
      CampaignID: singledata?.CampaignID,
      Impressions: singledata?.Impressions,
      Clicks: singledata?.Clicks,
      Conversions: singledata?.Conversions,
      UpdatedOn: currentDateTime,
    });
  }, [singledata]);

 

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = DmeCompaginAllData.filter((data) => {
        const allFields = `
          ${data?.Campaign?.Name || ""}
          ${data?.Impressions || ""}
          ${data?.Clicks || ""}
          ${data?.Conversions || ""}
          ${data?.UpdatedOn || ""}
        `.toLowerCase();

        return allFields.includes(searchTerm.toLowerCase());
      });

      setFilterData(filtered);
    } else {
      setFilterData(DmeCompaginAllData);
    }
  }, [searchTerm, DmeCompaginAllData]);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteDmePerformance(rowToDelete?.p_id));

        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllDmePerformance());
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
    let id = ele?.p_id;
    try {
      await dispatch(getDmePerformancebyid(id));
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
          updateDmePerformance({
            id: singledata?.PerformanceID,
            newData: formData,
          })
        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmePerformance());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createDmePerformance(formData));
        if (res?.payload?.status === 1) {
          await dispatch(getAllDmePerformance());
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
    { label: "Campaign Name", key: "CampaignName" },
    { label: "Impressions", key: "Impressions" },
    { label: "Clicks", key: "Clicks" },
    { label: "Conversions", key: "Conversions" },
    { label: "CTR", key: "ctr" },
    { label: "Conversions Rate", key: "Conversionsrate" },
    // { label: "Updated On", key: "UpdatedOn" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    CampaignName: ele?.Campaign?.Name || "N/A",
    Impressions: ele?.Impressions || "N/A",
    Clicks: ele?.Clicks || "N/A",
    Conversions: ele?.Conversions || "N/A",
    ctr: ele?.CTR || "N/A",
    Conversionsrate: ele?.ConversionRate || "N/A",
    // UpdatedOn: ele?.UpdatedOn || "N/A",
    p_id: ele?.PerformanceID,
  }));
  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="bg-gray-50 p-0 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md shadow-md">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-[#1F2937] hover:bg-[#151c27] text-white rounded-md mb-4 md:mb-0"
          >
            Add Performance Data
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Performance Data..."
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

        <DMEPerformanceCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Performance Data" : "Add Performance Data"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default DMEPerformance;
