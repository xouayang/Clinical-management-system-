const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Import = sequelize.define(
  "imports",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    staff_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    prescription_id:{
      type: DataTypes.UUID,
      allowNull: false, 
    },
    bill_number: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
  }
);

module.exports = Import;
