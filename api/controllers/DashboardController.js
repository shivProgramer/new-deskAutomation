const sequelize = require("../db");

const getDashboardData = async (req, res) => {
  try {
    // Execute the stored procedure to get the dashboard data
    const result = await sequelize.query(
      "EXEC GetDashboardBlock", // Your stored procedure name
      {
        type: sequelize.QueryTypes.SELECT, // Specify the query type as SELECT
      }
    );

    // Return the result from the stored procedure
    res.status(200).json({
      status: 1,
      message: "Dashboard data fetched successfully",
      data: result, // `result` contains the data returned by the stored procedure
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      status: 0,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};