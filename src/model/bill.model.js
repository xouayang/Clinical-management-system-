const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Bill = sequelize.define(
  "bill",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstcheck_id:{
      type: DataTypes.UUID,
      allowNull:false
      
    },
    bill_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Bill;
