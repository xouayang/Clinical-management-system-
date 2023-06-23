const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Treats = sequelize.define(
  "treats",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    disease_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bill_id:{
      type: DataTypes.UUID,
      allowNull: false,
    },
    details:{
        type:DataTypes.STRING,
        allowNull:false
    }
  },
  {
    sequelize,
    timestamps:true
  }
);

module.exports = Treats;
