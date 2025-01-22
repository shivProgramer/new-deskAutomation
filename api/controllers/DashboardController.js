const sequelize = require("../db");
const ProjectCostDetail = require("../models/Project_Cost_Details");
const DME_Performance = require("../models/DME_Performance");
const DME_Campaign = require("../models/DME_Campaign");

// const getallDashboard = async (req, res) => {
//   try {
//     const [employeePerformanceReport] = await sequelize.query(
//       "EXEC SP_EnhancedEmployeePerformanceReport_Consolidated"
//     );
//     const [salesReportByGroup] = await sequelize.query(
//       "EXEC SP_Sales_Report_ByGroup 'monthly', 'division'"
//     );

//     const last5dataofEmployee = Array.isArray(employeePerformanceReport)
//       ? employeePerformanceReport.slice(-5)
//       : [];

//     const last5dataofSalesReport = Array.isArray(salesReportByGroup)
//       ? salesReportByGroup.slice(-5)
//       : [];

//     const projectDetails = await ProjectCostDetail.findAll({
//       order: [["created_at", "DESC"]],
//       limit: 5,
//     });

//     console.log("projectDetails ----", projectDetails)

//     const dmePerformanceDetails = await DME_Performance.findAll({
//       order: [["UpdatedOn", "DESC"]],
//       limit: 5,
//     });

//     const response = {
//       last5dataofEmployee,
//       last5dataofSalesReport,
//       projectDetails,
//       dmePerformanceDetails,
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "An error occurred while fetching data." });
//   }
// };

const getallDashboard = async (req, res) => {
  try {
    // Fetching Employee Performance Report
    const [employeePerformanceReport] = await sequelize.query(
      "EXEC SP_EnhancedEmployeePerformanceReport_Consolidated"
    );

    // Fetching Sales Report By Group
    const [salesReportByGroup] = await sequelize.query(
      "EXEC SP_Sales_Report_ByGroup 'monthly', 'division'"
    );

    const [CompareEmpEffthismonth] = await sequelize.query(
      "GetEmployeeWorkHoursComparison"
    );

    // Getting the last 5 entries for Employee and Sales Reports
    const top5DataOfEmployee = Array.isArray(employeePerformanceReport)
      ? employeePerformanceReport.slice(0, 5)
      : [];

    const top5DataOfSalesReport = Array.isArray(salesReportByGroup)
      ? salesReportByGroup.slice(0, 5)
      : [];

      const CmpEmpEffthismonth = Array.isArray(CompareEmpEffthismonth)
      ? CompareEmpEffthismonth.slice(0, 5)
      : [];

    // Fetching Project Details
    const projectDetails = await ProjectCostDetail.findAll({
      order: [["created_at", "DESC"]],
      limit: 5,
    });

    // Fetching DME Performance Details with Campaign Names
    const [dmePerformanceResults] = await sequelize.query(`
      SELECT TOP 5
        p.*,
        c.CampaignName
      FROM 
        DME_Performance p
      LEFT JOIN 
        DME_Campaign c
      ON 
        p.CampaignID = c.CampaignID
      ORDER BY 
        p.UpdatedOn DESC
    `);

    // Preparing Response
    const response = {
      top5DataOfEmployee,
      top5DataOfSalesReport,
      projectDetails,
      dmePerformanceResults,
      CmpEmpEffthismonth,
    };

    // Sending Response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

module.exports = {
  getallDashboard,
};
