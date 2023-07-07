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
    treat_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Appoint;
