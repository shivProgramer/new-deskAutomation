
// import React, { useEffect, useState } from "react";
// import DynamicTable from "./DynamicTable";
// import { getAllAdhocReport, getSpData } from "../redux/slice/Adhoc_Report_slice";
// import Loader from "./Loader";
// import { useDispatch, useSelector } from "react-redux";

// const MenuWithData = () => {
//   const [selectedItem, setSelectedItem] = useState("Item 1");
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);

//   // Redux selectors
//   const allAdhocReport = useSelector(
//     (state) => state.adhoc_report?.allAdhocReport?.data
//   );
//   const sp_data = useSelector((state) => state.adhoc_report?.Spdata?.data);
//   const loading = useSelector((state) => state.adhoc_report?.loading);
//   const dispatch = useDispatch();

//   // Handlers
//   const handleEdit = (row) => {
//     console.log("Editing:", row);
//   };

//   const handleDelete = (row) => {
//     console.log("Deleting:", row);
//   };

//   useEffect(() => {
//     dispatch(getAllAdhocReport());
//   }, []);

//   const handleItemClick = (itemName) => {
//     setSelectedItem(itemName);
//     dispatch(getSpData(itemName));
//   };

//   useEffect(() => {
//     if (sp_data?.length > 0) {
//       const dynamicColumns = Object.keys(sp_data[0]).map((key) => ({
//         key,
//         label: key.charAt(0).toUpperCase() + key.slice(1),
//       }));
//       setColumns(dynamicColumns);
//       setData(sp_data);
//     }
//   }, [sp_data]);

//   return (
//     <>
//       {loading && <Loader loading={loading} />}
//       <div className="flex flex-col bg-gray-50">
        
//         {/* Menu Section - Horizontal Tabs (Card style) */}
//         <div className="flex flex-wrap gap-4 ml-10">
//         <div className="w-auto bg-gray-100 text-gray-600 p-6 rounded-b-xl shadow-lg" >
//           <h2 className="text-xl font-bold mb-6">Menu</h2>
//           <div className="flex flex-wrap justify-start gap-4">
//             {allAdhocReport?.map((item, index) => (
//               <div
//                 key={index}
//                 className={`cursor-pointer p-4 rounded-lg bg-white shadow-md transition-all duration-200 ease-in-out transform ${
//                   selectedItem === item.Name
//                     ? "bg-blue-100 text-blue-800"
//                     : "hover:bg-gray-200 hover:text-black"
//                 }`}
//                 onClick={() => handleItemClick(item.Name)}
//               >
//                 {item.Name}
//               </div>
//             ))}
//           </div>
//         </div>
//         </div>

//         {/* Data Display Section - Table Below Menu */}
//         <div className="w-full p-6">
//           <h2 className="text-3xl font-bold mb-6 text-gray-800">Data</h2>
//           <div className="bg-white p-6 rounded-lg shadow-lg h-auto">
//             <div>
//               <DynamicTable
//                 columns={columns}
//                 data={data}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MenuWithData;

import React, { useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import { getAllAdhocReport, getSpData } from "../redux/slice/Adhoc_Report_slice";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";

const MenuWithData = () => {
  const [selectedItem, setSelectedItem] = useState("Item 1");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // Redux selectors
  const allAdhocReport = useSelector(
    (state) => state.adhoc_report?.allAdhocReport?.data
  );
  const sp_data = useSelector((state) => state.adhoc_report?.Spdata?.data);
  const loading = useSelector((state) => state.adhoc_report?.loading);
  const dispatch = useDispatch();

  // Handlers
  const handleEdit = (row) => {
    console.log("Editing:", row);
  };

  const handleDelete = (row) => {
    console.log("Deleting:", row);
  };

  useEffect(() => {
    dispatch(getAllAdhocReport());
  }, []);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    dispatch(getSpData(itemName));
  };

  useEffect(() => {
    if (sp_data?.length > 0) {
      const dynamicColumns = Object.keys(sp_data[0]).map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
      }));
      setColumns(dynamicColumns);
      setData(sp_data);
    }
  }, [sp_data]);

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="flex flex-col bg-gray-50 ">
        
        {/* Menu Section - Horizontal Tabs (Card style) */}
        {/* <div className="flex flex-wrap gap-4 ml-10"> */}
          <div className="max-w-2xl md:max-w-5xl bg-gray-100 text-gray-600 p-6 rounded-b-xl shadow-lg z-10">
            <h2 className="text-xl font-bold mb-2">Menu</h2>
            <div className="flex flex-wrap justify-start gap-4">
              {allAdhocReport?.map((item, index) => (
                <div
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded-lg bg-white shadow-md transition-all duration-200 ease-in-out transform ${
                    selectedItem === item.Name
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                  onClick={() => handleItemClick(item.Name)}
                >
                  {item.Name}
                </div>
              ))}
            </div>
          </div>
        {/* </div> */}

        {/* Data Display Section - Table Below Menu */}
        <div className=" p-2  max-w-2xl md:max-w-5xl ">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Data</h2>
          <div className="bg-white p-2 rounded-lg shadow-lg overflow-x-auto">
            <div>
              <DynamicTable
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
                type="adhoc"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuWithData;
