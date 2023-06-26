const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const ImportDetails = sequelize.define(
  "import_details",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    import_id: {
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
    expire_date:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize,
  }
);

module.exports = ImportDetails;
