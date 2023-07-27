const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Standard = sequelize.define(
  "standard_values",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:true
    },
    stand_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disease_id:{
        type:DataTypes.UUID,
        allowNull:true
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Standard;
