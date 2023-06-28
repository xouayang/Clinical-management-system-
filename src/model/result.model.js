const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Result = sequelize.define(
  "results",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    staff_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstcheck_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bill_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  {
    sequelize,
  }
);

module.exports = Result;
