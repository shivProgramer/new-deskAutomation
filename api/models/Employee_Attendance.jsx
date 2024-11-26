// const { DataTypes, Sequelize } = require("sequelize");
// const sequelize = require("../db");
// const Employee = require("./Employee.js");
// const Project_Cost_Details = require("./Project_Cost_Details.js");


// const EmployeeAttendance = sequelize.define(
//   "EmployeeAttendance",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     desk_employee_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Employee, 
//         key: "desk_employee_id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     },
//     project_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Project_Cost_Details, 
//         key: "project_id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     },

//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     arrived: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     left: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     online_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     offline_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     desktime_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     at_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     after_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     before_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     productive_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // In seconds
//     },
//     productivity: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     efficiency: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     work_starts: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     work_ends: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     late: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     is_online: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     isDeleted: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false, // Default is not deleted
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//   },
//   {
//     tableName: "Employee_Attendance",
//     timestamps: false,
//   }
// );
// EmployeeAttendance.belongsTo(Employee, {
//   foreignKey: "desk_employee_id",
//   targetKey: "desk_employee_id",
//   as: "employee",
// });
// EmployeeAttendance.belongsTo(Project_Cost_Details, {
//   foreignKey: "project_id",
//   targetKey: "project_id",
//   as: "projectcostdetails",
// });



// module.exports = EmployeeAttendance;


// models/EmployeeAttendance.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EmployeeAttendance = sequelize.define('EmployeeAttendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  desk_employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  arrived: {
    type: DataTypes.DATE,
    allowNull: true
  },
  left: {
    type: DataTypes.DATE,
    allowNull: true
  },
  online_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  offline_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  desktime_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  at_work_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  after_work_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  before_work_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  productive_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  productivity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  efficiency: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  work_starts: {
    type: DataTypes.TIME,
    allowNull: true
  },
  work_ends: {
    type: DataTypes.TIME,
    allowNull: true
  },
  late: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Employee_Attendance',
  timestamps: false
});

module.exports = EmployeeAttendance;
