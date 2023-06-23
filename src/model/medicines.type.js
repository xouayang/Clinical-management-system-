const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const MedicinesType = sequelize.define(
  "medicinestype",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit:{
      type:DataTypes.STRING,
      allowNull:true
    },
    created_at:{
     type:DataTypes.DATE,
     defaultValue: sequelize.literal('NOW()'),
    },
    update_at:{
     type:DataTypes.DATE,
     defaultValue: sequelize.literal('NOW()'),
    },
  },
  {
    sequelize
  }
);

module.exports = MedicinesType;
