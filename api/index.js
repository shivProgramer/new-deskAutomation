
require("dotenv").config(); 
const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db"); 
const adminUserRoutes = require("./routes/adminUserRoutes"); 
const projectCostRoutes = require('./routes/project_cost');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require("./routes/attendance.js");
const employeeHourlyRateRoutes = require('./routes/employeeHourlyRateRoutes.js');
const adhocReportRoutes = require("./routes/adhocReportRoutes.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//routes  ----
app.use("/api/admin-users", adminUserRoutes);
app.use("/api", projectCostRoutes);
app.use('/api/employees', employeeRoutes);
app.use("/api", attendanceRoutes);
app.use('/api/employee-hourly-rate', employeeHourlyRateRoutes);

app.use("/api/adhoc-reports", adhocReportRoutes);

// Define a simple test route
app.get("/tester", (req, res) => {
  res.send("Hello World!");
});
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error("Database sync error:", err);
});