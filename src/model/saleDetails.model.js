const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const SaleDetails = sequelize.define(
  "saleDetails",
  {
    saleDetails_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    staff_id: {
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
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = SaleDetails;
