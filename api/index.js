require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const adminUserRoutes = require("./routes/adminUserRoutes");
const projectCostRoutes = require("./routes/project_cost");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendance.js");
const employeeHourlyRateRoutes = require("./routes/employeeHourlyRateRoutes.js");
const adhocReportRoutes = require("./routes/adhocReportRoutes.js");
const dalyReportsRoutes = require("./routes/dalyReportsRoutes");
const ecommProjectListRoutes = require("./routes/ecommProjectListRoutes");
const DME_AnalysisRoutes = require("./routes/DME_AnalysisRoutes.js");
const salesRewardsRoutes = require("./routes/Sales_RewardsSetupRoutes.js");
const Sales_SalesTransactions = require("./routes/Sales_SalesTransactionsRoute.js");
const Sales_TeamTarget = require("./routes/Sales_TeamTargetsRoutes.js");
const dmeCampaignRouter = require("./routes/DMECampaignRouter.js");
const dmePerformance = require("./routes/DME_PerformanceRoutes.js");
const DME_RewardRulesRouter = require("./routes/DME_RewardRulesRouter.js");
const DME_ROASRoutes = require("./routes/DME_ROASRoutes.js");
const DME_TeamRoutes = require("./routes/DME_TeamRoutes.js");
const DME_BudgetRoutes = require("./routes/DME_BudgetRoutes.js");
const employeeOffdayRoutes = require("./routes/EmployeeOffdayRoutes.js");
const holidayRoutes = require("./routes/holidayRoutes.js");

const dashboardRoutes = require("./routes/dashboardRoutes.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//routes  ----
app.use("/api/admin-users", adminUserRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", projectCostRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api", attendanceRoutes);
app.use("/api/employee-hourly-rate", employeeHourlyRateRoutes);
app.use("/api/adhoc-reports", adhocReportRoutes);
app.use("/api/daly-reports", dalyReportsRoutes);
app.use("/api/ecomm-p-list", ecommProjectListRoutes);
app.use("/api/dme/analysis", DME_AnalysisRoutes);
app.use("/api/sales_rewards", salesRewardsRoutes);
app.use("/api/sales/transaction", Sales_SalesTransactions);
app.use("/api/sales-targets", Sales_TeamTarget);
app.use("/api/dme/compaign", dmeCampaignRouter);
app.use("/api/dme/preformance", dmePerformance);
app.use('/api/dme/reward-rules', DME_RewardRulesRouter);
app.use('/api/dme/roas', DME_ROASRoutes);
app.use('/api/dme/teams', DME_TeamRoutes);
app.use('/api/dme/budgets', DME_BudgetRoutes);
app.use("/api/employee-offdays", employeeOffdayRoutes);
app.use("/api/holidays", holidayRoutes);
// Define a simple test route
app.get("/tester", (req, res) => {
  res.send("Hello World!");
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });
