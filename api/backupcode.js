CREATE TABLE [nowgrayl_deskAutomation_db].[dbo].[Employee_Attendance] (
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [desk_employee_id] INT NOT NULL,
    [date] DATE NOT NULL,
    [arrived] DATETIME NULL,
    [left] DATETIME NULL,
    [online_time] INT NULL, -- in seconds
    [offline_time] INT NULL, -- in seconds
    [desktime_time] INT NULL, -- in seconds
    [at_work_time] INT NULL, -- in seconds
    [after_work_time] INT NULL, -- in seconds
    [before_work_time] INT NULL, -- in seconds
    [productive_time] INT NULL, -- in seconds
    [productivity] FLOAT NULL,
    [efficiency] FLOAT NULL,
    [work_starts] TIME NULL,
    [work_ends] TIME NULL,
    [late] BIT NULL,
    [is_online] BIT NULL,
    [isDeleted] BIT DEFAULT 0, -- New field added for soft deletion (0 = not deleted, 1 = deleted)
    [created_at] DATETIME DEFAULT GETDATE(),
    [updated_at] DATETIME DEFAULT GETDATE()
);

-- Create or update the index to include isDeleted for better query performance
CREATE INDEX idx_employee_attendance_desk_employee_id_date_isDeleted
ON [nowgrayl_deskAutomation_db].[dbo].[Employee_Attendance] ([desk_employee_id], [date], [isDeleted]);


// for - attendance --------------------------------------------------
// Controller for Check-in
// exports.checkIn = async (req, res) => {
//   try {
//     const { desk_employee_id, arrived, work_starts, is_online } = req.body;

//     // Check if required fields are present
//     if (!desk_employee_id || !arrived) {
//       return res.status(400).json({ message: "Employee ID and arrived time are required." });
//     }

//     // Validate and format the 'arrived' time
//     const formattedArrived = moment(arrived, "YYYY-MM-DD HH:mm:ss", true);
//     if (!formattedArrived.isValid()) {
//       return res.status(400).json({
//         message: "Invalid arrived time format. Expected format: YYYY-MM-DD HH:mm:ss",
//       });
//     }

//     // Validate and format the 'work_starts' time if provided
//     let formattedWorkStarts = null;
//     if (work_starts) {
//       const workStartsMoment = moment(work_starts, "HH:mm:ss", true);
//       if (!workStartsMoment.isValid()) {
//         return res.status(400).json({
//           message: "Invalid work starts time format. Expected format: HH:mm:ss",
//         });
//       }
//       formattedWorkStarts = workStartsMoment.format("HH:mm:ss");
//     }

//     // Default 'is_online' to false if not provided
//     const isOnlineStatus = is_online !== undefined ? is_online : false;

//     // Format the arrived time to 'YYYY-MM-DD HH:mm:ss' and work starts to 'HH:mm:ss'
//     const arrivedFormatted = formattedArrived.format("YYYY-MM-DD HH:mm:ss");
//     const workStartsFormatted = formattedWorkStarts ? formattedWorkStarts : null;

//     // Use TRY_CONVERT function for SQL to avoid conversion errors
//     const sqlQuery = `
//       INSERT INTO Employee_Attendance (desk_employee_id, date, arrived, work_starts, is_online)
//       VALUES (
//         :desk_employee_id,                -- Use parameterized variable
//         TRY_CONVERT(DATE, :date, 120),     -- Convert to DATE format
//         TRY_CONVERT(DATETIME, :arrived, 120), -- Convert to DATETIME format
//         TRY_CONVERT(TIME, :work_starts, 108), -- Convert to TIME format
//         :is_online
//       )
//     `;

//     // Execute the query using Sequelize and pass the parameters via 'replacements'
//     await sequelize.query(sqlQuery, {
//       replacements: {
//         desk_employee_id,
//         date: moment().format("YYYY-MM-DD"), // Current date in 'YYYY-MM-DD'
//         arrived: arrivedFormatted,            // Formatted 'arrived' datetime
//         work_starts: workStartsFormatted,     // Formatted 'work_starts' time
//         is_online: isOnlineStatus,            // is_online status (true/false)
//       }
//     });

//     return res.status(201).json({ message: "Check-in successful" });
//   } catch (error) {
//     console.error("Error during check-in:", error);
//     return res.status(500).json({ message: "Error during check-in", error: error.message });
//   }
// };

// exports.checkIn = async (req, res) => {
//   try {
//     const { desk_employee_id } = req.params; 
//     const currentTime = moment();  

    
//     if (!desk_employee_id) {
//       return res.status(400).json({ message: "Employee ID is required." });
//     }

    
//     const arrived = currentTime.format("YYYY-MM-DD HH:mm:ss");
//     const work_starts = currentTime.format("HH:mm:ss");
//     const is_online = true;

//     // Use TRY_CONVERT function for SQL to avoid conversion errors
//     const sqlQuery = `
//       INSERT INTO Employee_Attendance (desk_employee_id, date, arrived, work_starts, is_online)
//       VALUES (
//         :desk_employee_id,                -- Use parameterized variable
//         TRY_CONVERT(DATE, :date, 120),     -- Convert to DATE format
//         TRY_CONVERT(DATETIME, :arrived, 120), -- Convert to DATETIME format
//         TRY_CONVERT(TIME, :work_starts, 108), -- Convert to TIME format
//         :is_online
//       )
//     `;

//     // Execute the query using Sequelize and pass the parameters via 'replacements'
//     await sequelize.query(sqlQuery, {
//       replacements: {
//         desk_employee_id,
//         date: moment().format("YYYY-MM-DD"), 
//         arrived,            
//         work_starts,      
//         is_online,          
//       }
//     });

//     return res.status(201).json({ message: "Check-in successful" });
//   } catch (error) {
//     console.error("Error during check-in:", error);
//     return res.status(500).json({ message: "Error during check-in", error: error.message });
//   }
// };



// Controller for Check-out
// exports.checkOut = async (req, res) => {
//   try {
//     const { desk_employee_id } = req.params;  // Get desk_employee_id from the URL
//     const currentTime = moment();  // Get current time using moment.js

//     // Check if desk_employee_id is provided in the URL
//     if (!desk_employee_id) {
//       return res.status(400).json({ message: "Employee ID is required." });
//     }
    
//     // Find the attendance record for today (most recent)
//     const attendanceRecord = await EmployeeAttendance.findOne({
//       where: {
//         desk_employee_id,
//         date: moment().format("YYYY-MM-DD"),
//         isDeleted: false,
//       },
//       order: [["created_at", "DESC"]],  // Get the most recent attendance record
//     });

//     if (!attendanceRecord) {
//       return res.status(404).json({ error: "No attendance record found for today" });
//     }

//     // Set 'left' to the current date and time if not provided in the request
//     const left = currentTime.format("YYYY-MM-DD HH:mm:ss");

//     // Set 'work_ends' to the current time if not provided
//     const work_ends = currentTime.format("HH:mm:ss");

//     // Set online_time and offline_time to defaults if not provided
//     const online_time = attendanceRecord.online_time || 0;
//     const offline_time = attendanceRecord.offline_time || 0;

//     // Prepare SQL query for updating check-out details
//     const sqlQuery = `
//       UPDATE Employee_Attendance
//       SET 
//         [left] = TRY_CONVERT(DATETIME, :left, 120), 
//         work_ends = TRY_CONVERT(TIME, :work_ends, 108),
//         is_online = 0,  -- Set is_online to 0 (indicating offline)
//         online_time = :online_time,
//         offline_time = :offline_time
//       WHERE desk_employee_id = :desk_employee_id
//         AND date = TRY_CONVERT(DATE, :date, 120)
//         AND isDeleted = 0
//     `;

//     // Execute the query using Sequelize and pass the parameters via 'replacements'
//     await sequelize.query(sqlQuery, {
//       replacements: {
//         desk_employee_id,
//         left,  // Current date and time for 'left'
//         work_ends,  // Current time for 'work_ends'
//         online_time,  // Use the existing online_time from the attendance record or 0
//         offline_time,  // Use the existing offline_time from the attendance record or 0
//         date: moment().format("YYYY-MM-DD"),  // Current date in 'YYYY-MM-DD'
//       }
//     });

//     return res.status(200).json({ message: "Check-out successful" });
//   } catch (err) {
//     console.error("Error during check-out:", err);
//     return res.status(500).json({ error: "Failed to check-out", message: err.message });
//   }
// };







