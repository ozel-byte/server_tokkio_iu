const {Model,DataTypes} = require('sequelize');
const sequelize = require('../DATABASE/db');

/*Modelo para el usuario */
class User extends Model{}


User.init({
    idUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: DataTypes.STRING,
    correo: DataTypes.STRING,
    pass: DataTypes.STRING,
    imgPerfil: DataTypes.STRING
},
{
    sequelize,
    modelName: 'usuario',
     freezeTableName: true
 })

 module.exports = User;