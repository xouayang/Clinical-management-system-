const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Appoint = sequelize.define(
  "appoints",
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
    tel:{
        type:DataTypes.STRING,
        allowNull:false
    },
    appoints:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize
  }
);

module.exports = Appoint;
