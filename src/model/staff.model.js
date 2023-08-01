const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Staff = sequelize.define(
  "staffs",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    employee_id:{
      type:DataTypes.STRING,
      allowNull:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
     type:DataTypes.STRING,
     allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.ENUM('statff_medicines', 'staff', 'doctor', 'admin','financial'),
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Staff;
