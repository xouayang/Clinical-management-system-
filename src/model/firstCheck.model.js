const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const FirstCheck = sequelize.define(
  "firstchecks",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    patients_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = FirstCheck;
