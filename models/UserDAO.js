const {Model,DataTypes} = require('sequelize');
const sequelize = require('../DATABASE/db');


class User extends Model{}


User.init({
    idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    correo: DataTypes.STRING,
    pass: DataTypes.STRING
},
{
    sequelize,
    modelName: 'usuario',
     freezeTableName: true
 })

 module.exports = User;