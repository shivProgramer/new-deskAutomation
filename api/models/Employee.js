// const { DataTypes, Sequelize } = require("sequelize");
// const sequelize = require("../db");

// const Employee = sequelize.define(
//   "Employee",
//   {
//     desk_employee_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique:true,
//     },
//     group_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     group_name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     profile_url: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     is_online: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     arrived: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     left: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     late: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     online_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     offline_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     desktime_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     at_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     after_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     before_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     productive_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
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
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//     isDeleted: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false, // Updated to match the table schema
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false, // New field added to match the table schema
//     },
//   },
//   {
//     tableName: "Employees",
//     timestamps: false,
//   }
// );

// // Define the foreign key relationship
// Employee.belongsTo(require("./adminUser.js"), {
//   foreignKey: "user_id",
//   targetKey: "user_id",
//   as: "adminUser",
// });

// module.exports = Employee;

const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define(
  "Employee",
  {
    desk_employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_online: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    arrived: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    left: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    late: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    online_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    offline_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    desktime_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    at_work_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    after_work_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    before_work_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productive_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productivity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    efficiency: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    work_starts: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    work_ends: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("GETDATE"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("GETDATE"),
    },
    
  },
  {
    tableName: "Employees",
    timestamps: false,
    //  sequelize,
    //   modelName: 'Employee',
    //   tableName: 'Employees',
    //   timestamps: false,
  }
);

module.exports = Employee;
