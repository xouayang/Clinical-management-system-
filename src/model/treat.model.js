const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Treats = sequelize.define(
  "treats",
  {
    treat_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstCheck_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    disease_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,   
    },
    details:{
        type:DataTypes.STRING,
        allowNull:false
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Treats;
