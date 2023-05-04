const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const OfferDetails = sequelize.define(
  "offerDetails",
  {
    offerDetails_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    offer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    medicines_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sum: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = OfferDetails;
