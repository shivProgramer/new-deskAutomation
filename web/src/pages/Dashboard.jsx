import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getallDashboard } from "../redux/slice/Dashboard_slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  // get data from redux to here -----------------
  const dataOfDashboard = useSelector(
    (state) => state?.dashboard?.alldashboardData
  );

  const loading = useSelector((state) => state?.dashboard?.loading);

  console.log("dataOfDashboard ----", dataOfDashboard);
  useEffect(() => {
    dispatch(getallDashboard());
  }, []);

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="container mx-auto px-4 py-1">
        <h1 className="text-3xl font-bold text-green-600 mb-3">Dashboard</h1>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-3">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg col-span-2 overflow-hidden border border-gray-200">
            <div className=" text-gray-600 p-2">
              <h2 className="text-base font-bold  text-shadow-sm text-green-600 ">
                Latest Employee Leader Board
              </h2>
            </div>
            <div className="p-1">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-1.5 text-left">ID</th>
                      <th className="px-3 py-1.5 text-left">Employee</th>
                      <th className="px-3 py-1.5 text-left">Flag</th>
                      <th className="px-3 py-1.5 text-left">Suggestions</th>
                      {/* <th className="px-3 py-1.5 text-left">Metrics</th> */}
                      <th className="px-3 py-1.5 text-left">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOfDashboard?.last5dataofEmployee?.map((emp, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-3 py-1.5">{index + 1}</td>
                        <td className="px-3 py-1.5">{emp?.Employee}</td>
                        <td className="px-3 py-1.5">{emp?.Flag}</td>
                        <td className="px-3 py-1.5">{emp?.Suggestions}</td>
                        {/* <td className="px-3 py-1.5">{emp?.Metrics}</td> */}
                        <td className="px-3 py-1.5">{emp?.Remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg col-span-2 overflow-hidden border border-gray-200">
          <div className=" text-gray-600 p-2">
          <h2 className="text-base font-bold  text-shadow-sm text-green-600 "> Projects </h2>
            </div>
            <div className="p-2">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-1.5 text-left">ID</th>
                      <th className="px-3 py-1.5 text-left">Project Id</th>
                      <th className="px-3 py-1.5 text-left">Name</th>
                      <th className="px-3 py-1.5 text-left"> Current Cost</th>
                      <th className="px-3 py-1.5 text-left"> Budget</th>
                      <th className="px-3 py-1.5 text-left"> Actual Cost</th>
                      <th className="px-3 py-1.5 text-left"> Paid Amount</th>
                      <th className="px-3 py-1.5 text-left"> Start Date </th>
                      <th className="px-3 py-1.5 text-left"> End Date </th>
                      <th className="px-3 py-1.5 text-left"> Duration </th>
                      <th className="px-3 py-1.5 text-left"> Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOfDashboard?.projectDetails?.map((project, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-3 py-1.5">{index + 1}</td>

                        <td className="px-3 py-1.5">
                          {project?.project_id || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.project_name || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.current_cost || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.budget || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.actual_cost || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.Paid_amount || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.start_date || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.end_date || "N/A"}
                        </td>

                        <td className="px-3 py-1.5">
                          {project?.IsMonthly === true
                            ? "monthly"
                            : "one time" || "N/A"}
                        </td>
                        <td className="px-3 py-1.5">
                          {project?.is_critical ? "Critical" : "Non-Critical"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className=" text-gray-600 p-2">
          <h2 className="text-base font-bold  text-shadow-sm text-green-600 "> Sales by Division</h2>
            </div>
            <div className="p-2">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-1.5 text-left">ID</th>
                      <th className="px-3 py-1.5 text-left">Grouped By</th>
                      <th className="px-3 py-1.5 text-left">Period</th>
                      <th className="px-3 py-1.5 text-left">Total Sales Count</th>
                      <th className="px-3 py-1.5 text-left">Total Sales Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOfDashboard?.last5dataofSalesReport?.map(
                      (sales, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-3 py-1.5">{index + 1}</td>
                          <td className="px-3 py-1.5">{sales?.GroupedBy}</td>
                          <td className="px-3 py-1.5">{sales?.Period}</td>
                          <td className="px-3 py-1.5">
                            {sales?.TotalSalesCount}
                          </td>
                          <td className="px-3 py-1.5">
                            {sales?.TotalSalesValue}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className=" text-gray-600 p-2">
          <h2 className="text-base font-bold  text-shadow-sm text-green-600 "> DME Performance</h2>
            </div>
            <div className="p-2">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-3 py-1.5 text-left">ID</th>
                      <th className="px-3 py-1.5 text-left"> Campaign Name</th>
                      <th className="px-3 py-1.5 text-left">Impressions</th>
                      <th className="px-3 py-1.5 text-left">Clicks</th>
                      <th className="px-3 py-1.5 text-left">Conversions</th>
                      <th className="px-3 py-1.5 text-left">CTR</th>
                      <th className="px-3 py-1.5 text-left">Conversions Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOfDashboard?.dmePerformanceResults?.map(
                      (compaign, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-3 py-1.5">{index + 1}</td>
                          <td className="px-3 py-1.5">
                            {compaign?.CampaignName}
                          </td>
                          <td className="px-3 py-1.5">{compaign?.Impressions}</td>
                          <td className="px-3 py-1.5">{compaign?.Clicks}</td>
                          <td className="px-3 py-1.5">{compaign?.Conversions}</td>
                          <td className="px-3 py-1.5">{compaign?.CTR}</td>
                          <td className="px-3 py-1.5">
                            {compaign?.ConversionRate}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
