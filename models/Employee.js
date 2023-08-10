const { DataTypes , Model } = require('sequelize');
const sequelize = require('../config/db');
const Asset = require('./Asset');
class Employee extends Model {}
Employee.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    department:
    {
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        allowNull:false

    }    
    
}, {
    sequelize,
    modelName:'employee'});
Employee.belongsTo(Asset, { foreignKey: 'assetId' });

module.exports = Employee;