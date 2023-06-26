const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Prescription_deails = sequelize.define(
  "prescription_details",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    prescription_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    medicines_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
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
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bill_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_at:{
      type:DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    }
  },
  {
    sequelize,
  }
);

module.exports = Prescription_deails;
