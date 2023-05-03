const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const FirstCheck = sequelize.define(
  "disease",
  {
    disease_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = FirstCheck;
