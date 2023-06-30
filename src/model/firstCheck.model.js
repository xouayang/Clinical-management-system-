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
    },
    chip_life: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue:1
    },
  },
  {
    sequelize,
  }
);

module.exports = FirstCheck;
