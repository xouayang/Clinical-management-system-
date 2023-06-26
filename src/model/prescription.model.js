const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Prescription = sequelize.define(
  "prescription",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bill_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
  },
  {
    sequelize,
  }
);

module.exports = Prescription;
