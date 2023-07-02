const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Offer = sequelize.define(
  "offer",
  {
    offer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    treat_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    medicines_id:{
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    bill_number:{
      type:DataTypes.STRING,
      allowNull:false
    },

    status:{
     type:DataTypes.INTEGER,
     defaultValue:1
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Offer;
