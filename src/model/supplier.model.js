const DataTypes = require('sequelize');
const sequelize = require('../config/db.config');

const Suppliers = sequelize.define('suppliers',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        supplier_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier_tel :{
         type:DataTypes.STRING,
         allowNull:false   
        },
        supplier_address :{
         type:DataTypes.STRING,
         allowNull:false   
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = Suppliers;