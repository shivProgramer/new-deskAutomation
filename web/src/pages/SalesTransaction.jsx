import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import SalesTransactionCreateUpdateModal from "../components/SalesTransactionCreateUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createSalesTransaction,
  deleteSalesTransaction,
  getAllSalesTransaction,
  getSalesTransactionbyid,
  updateSalesTransaction,
} from "../redux/slice/SalesTransaction_slice";
import { showToast } from "../utils/config";
import Loader from "../components/Loader";
const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${date} ${time}.${milliseconds}`;
};

const SalesTransaction = () => {
  const dispatch = useDispatch();
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [formData, setFormData] = useState({
    SaleID:0,
    EmployeeID: 0,
    SaleDate: "",
    SaleValue: 0,
    RewardValue: 0,
    SalesSource: "",
    ProjectName: "",
    AdCampaignName: "",
    DivisionName: "",
    CreatedAt: currentDateTime,
  });

  const initialFormData = {
    EmployeeID: 0,
    SaleID:0,
    SaleDate: "",
    SaleValue: 0,
    RewardValue: 0,
    SalesSource: "",
    ProjectName: "",
    AdCampaignName: "",
    DivisionName: "",
    CreatedAt: currentDateTime,
  };
  

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
  }, []);
  // get data from redux to here -----------------
  const salesTransactionAllData = useSelector(
    (state) => state?.sales_transaction?.allSalesTransationData
  );
  const singledata = useSelector(
    (state) => state.sales_transaction?.singleSalesTransaction
  );
  const loading = useSelector((state) => state?.sales_transaction?.loading);

  // Filtering the data based on search term
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = salesTransactionAllData.filter((ele) => {
        const combinedFields = [
          ele?.Employee?.name || "",
          ele?.SaleDate || "",
          ele?.SaleValue || "",
          ele?.RewardValue || "",
          ele?.SalesSource || "",
          ele?.ProjectName || "",
          ele?.AdCampaignName || "",
          ele?.DivisionName || "",
        ]
          .join(" ")
          .toLowerCase();

        return combinedFields.includes(searchTerm.toLowerCase());
      });
      setFilterData(filtered);
    } else {
      setFilterData(salesTransactionAllData);
    }
  }, [searchTerm, salesTransactionAllData]);

  // api calling to here ------------------------------
  useEffect(() => {
    dispatch(getAllSalesTransaction());
  }, []);

  useEffect(() => {
    setFormData({
      SaleID:singledata?.SaleID,
      EmployeeID: singledata?.EmployeeID,
      SaleDate: singledata?.SaleDate,
      SaleValue: singledata?.SaleValue,
      RewardValue: singledata?.RewardValue,
      SalesSource: singledata?.SalesSource,
      ProjectName: singledata?.ProjectName,
      AdCampaignName: singledata?.AdCampaignName,
      DivisionName: singledata?.DivisionName,
      CreatedAt: singledata?.CreatedAt,
    });
  }, [singledata]);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Employee Name", key: "Employee_name" },
    { label: "Sale Date", key: "SaleDate" },
    { label: "Sale Value", key: "SaleValue" },
    { label: "Reward Value", key: "RewardValue" },
    { label: "Sales Source", key: "SalesSource" },
    { label: "Project Name", key: "ProjectName" },
    { label: "Ad Campaign Name", key: "AdCampaignName" },
    { label: "Division Name", key: "DivisionName" },
    // { label: "Created At", key: "CreatedAt" },
  ];

  const data = filterData?.map((ele, index) => ({
    id: index + 1,
    Employee_name: ele?.Employee?.name || "N/A",
    SaleDate: ele?.SaleDate || "N/A",
    SaleValue: ele?.SaleValue || "N/A",
    RewardValue: ele?.RewardValue || "N/A",
    SalesSource: ele?.SalesSource || "N/A",
    ProjectName: ele?.ProjectName || "N/A",
    AdCampaignName: ele?.AdCampaignName || "N/A",
    DivisionName: ele?.DivisionName || "N/A",
    // CreatedAt: ele?.CreatedAt,
    t_id: ele?.SaleID,
  }));

  const handleDelete = (row) => {
  
    setRowToDelete(row);
    setIsModalOpendelete(true);
  };

  const confirmDelete = async () => {
    
    if (rowToDelete) {
      try {
        const res = await dispatch(deleteSalesTransaction(rowToDelete?.t_id));
        if (res?.payload) {
          showToast(res?.payload?.message, "success");
        }
        await dispatch(getAllSalesTransaction());
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
    let id = ele?.t_id;
    try {
      await dispatch(getSalesTransactionbyid(id));
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
          updateSalesTransaction({ id: singledata?.SaleID, newData: formData })

        );
        if (res?.payload?.status === 1) {
          await dispatch(getAllSalesTransaction());
          showToast(res?.payload?.message, "success");
        } else {
          showToast(res?.payload?.error, "error");
        }
      } catch (error) {
        showToast(error, "error");
      }
    } else {
      try {
        const res = await dispatch(createSalesTransaction(formData))
        if (res?.payload?.status === 1) {
          await dispatch(getAllSalesTransaction());
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
      <div className="min-h-screen p-0 md:p-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 bg-gray-100 rounded-md ">
          <button
            onClick={openModal}
            className="px-4 py-1 bg-green-600 hover:bg-green700 text-white rounded-md mb-2 md:mb-0"
          >
            Create Transaction
          </button>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Sales Transaction..."
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

        <SalesTransactionCreateUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isUpdate ? "Update Transaction" : "Create Transaction"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default SalesTransaction;
