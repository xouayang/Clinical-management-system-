const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Medicines = sequelize.define(
  "medicines",
  {
    medicines_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicines_type_id:{
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expired_date:{
     type:DataTypes.DATE,
     allowNull:true
    },
    createdAt : {
      type:DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt:{
      type:DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    }
  },
  {
    sequelize
  }
);

module.exports = Medicines;
