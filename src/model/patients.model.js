const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Patients = sequelize.define(
  "patients",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birtday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    details:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  {
    sequelize
  }
);

module.exports = Patients;
