const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const SaleDetails = sequelize.define(
  "sale_details",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    staff_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    treat_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    amount:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
  },
  {
    sequelize
  }
);

module.exports = SaleDetails;
