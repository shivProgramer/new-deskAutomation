const EmployeeOffday = require("../models/Employee_Offdays");

const errorHandlerMiddleware = require("../middleware/errorHandlerMiddleware");
const sequelize = require("../db.js");
const { allEmployeeOffDaysDetails } = require("../utils/query.js");


exports.getAllEmployeeOffdays = async (req, res) => {
    try {
      // Define the raw SQL query with JOIN to fetch the employee offdays and employee names
      const sqlQuery = allEmployeeOffDaysDetails;
  
      // Execute the raw SQL query using Sequelize
      const employeeOffdays = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
      });
  
      // Return the results with status and message
      res.status(200).json({
        status: 1,
        message: "Employee offdays retrieved successfully",
        data: employeeOffdays,
      });
    } catch (error) {
      // Log error and return the error message
      console.error("Error retrieving employee offdays:", error);
      res.status(500).json({
        message: "Error retrieving employee offdays",
        error: error.message,
      });
    }
  };
  

exports.getEmployeeOffdayById = async (req, res) => {
  const { id } = req.params;
  try {
    const offday = await EmployeeOffday.findOne({
      where: { id: id },
    });
    if (offday) {
      res.status(200).json(offday);
    } else {
      res.status(404).json({ message: "Employee offday not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving employee offday", error });
  }
};

// Controller: Create Employee Offday
exports.createEmployeeOffday = async (req, res) => {
  try {
    const {
      desk_employee_id,
      off_date,
      is_covered,
      covered_date,
      reason,
      created_at,
      updated_at,
    } = req.body;

    // Ensure desk_employee_id and off_date are provided
    if (!desk_employee_id || !off_date) {
      return res.json({
        message: "desk_employee_id and off_date are missing",
        status: 0,
      });
    }

    // Prepare the SQL query to insert the employee offday data
    const sqlQuery = `
            INSERT INTO Employee_Offdays (
                desk_employee_id,
                off_date,
                is_covered,
                covered_date,
                reason,
                created_at,
                updated_at
            ) 
            VALUES (
                :desk_employee_id,
                :off_date,
                :is_covered,
                :covered_date,
                :reason,
                TRY_CONVERT(DATETIME, :created_at, 120), -- Converts created_at to DATETIME format
                TRY_CONVERT(DATETIME, :updated_at, 120)  -- Converts updated_at to DATETIME format
            );
            
            -- Return the newly inserted record
            SELECT * FROM Employee_Offdays WHERE id = SCOPE_IDENTITY();`;

    // Execute the query and fetch the inserted data
    const result = await sequelize.query(sqlQuery, {
      replacements: {
        desk_employee_id,
        off_date,
        is_covered,
        covered_date,
        reason,
        created_at,
        updated_at,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    console.log("Inserted Row Data: ", result);

    // Return the inserted row data
    res.status(201).json({
      message: "Employee offday successfully created",
      status: 1,
      data: result[0], // Return the newly created offday record
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error creating employee offday", status: 0 });
  }
};

// Controller: Get Employee Offday by ID
exports.getEmployeeOffday = async (req, res) => {
  try {
    const { desk_employee_id, off_date } = req.query;

    // Validate the input
    if (!desk_employee_id || !off_date) {
      return res
        .status(400)
        .json({
          message: "desk_employee_id and off_date are required",
          status: 0,
        });
    }

    // Query for the employee offday
    const offday = await EmployeeOffday.findOne({
      where: {
        desk_employee_id,
        off_date,
      },
    });

    if (!offday) {
      return res
        .status(404)
        .json({ message: "Employee offday not found", status: 0 });
    }

    res.status(200).json({
      message: "Employee offday retrieved successfully",
      status: 1,
      data: offday,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error retrieving employee offday", status: 0 });
  }
};

exports.updateEmployeeOffday = async (req, res) => {
    const { id } = req.params;
    const {
      desk_employee_id,
      off_date,
      is_covered,
      covered_date,
      reason,
      updated_at,
    } = req.body;
  
    try {
      // Ensure required fields are provided
      if (!desk_employee_id || !off_date || !is_covered) {
        return res.json({ message: "Required fields are missing", status: 0 });
      }
  
      // Prepare the SQL query for updating the employee offday
      const sqlQuery = `
        UPDATE Employee_Offdays
        SET 
          desk_employee_id = :desk_employee_id, -- Include desk_employee_id in the update
          off_date = :off_date,
          is_covered = :is_covered,
          covered_date = :covered_date,
          reason = :reason,
          updated_at = TRY_CONVERT(DATETIME, :updated_at, 120) -- Converts updated_at to DATETIME format
        WHERE id = :id;
  
        -- Return the updated record
        SELECT * FROM Employee_Offdays WHERE id = :id;
      `;
  
      // Execute the query to update the employee offday
      const result = await sequelize.query(sqlQuery, {
        replacements: {
          id,
          desk_employee_id, // Add desk_employee_id to replacements
          off_date,
          is_covered,
          covered_date,
          reason,
          updated_at,
        },
        type: sequelize.QueryTypes.SELECT,
      });
  
      if (!result || result.length === 0) {
        return res.json({ message: "Employee offday not found", status: 0 });
      }
  
      // Return the updated offday record
      res.json({
        message: "Employee offday updated successfully",
        status: 1,
        offday: result[0], // Return the updated offday record
      });
    } catch (error) {
      console.log(`Exception: ${error.message}`);
      return res.status(500).json({
        error: "Error updating employee offday",
        status: 0,
      });
    }
  };
  
  

exports.deleteEmployeeOffday = async (req, res) => {
  const { id } = req.params;
  try {
    const offday = await EmployeeOffday.findOne({
      where: { id: id },
    });

    if (!offday) {
      return res.status(404).json({ message: "Employee offday not found" });
    }

    // Delete the employee offday record
    await offday.destroy();
    res.status(200).json({ message: "Employee offday deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee offday", error });
  }
};
