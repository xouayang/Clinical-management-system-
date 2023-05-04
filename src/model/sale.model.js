const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Sale = sequelize.define(
  "sales",
  {
    sale_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Sale;
