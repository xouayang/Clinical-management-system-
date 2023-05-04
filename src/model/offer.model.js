const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Offer = sequelize.define(
  "offer",
  {
    offer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    treat_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalPrice:{
        type: DataTypes.INTEGER,
        allowNull: false,   
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Offer;
