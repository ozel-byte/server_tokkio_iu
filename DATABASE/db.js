const {Sequelize} = require('sequelize');

let name = process.env.NAME;
let user = process.env.DBUSER;
let pass = process.env.PASS;
let host = process.env.HOST;
const sequelize = new Sequelize(
   name,
    user,
    pass,
    {
        host: host,
        dialect: 'mysql',
        logging:false,
        define : {
            timestamps: false
        }
    }
);

module.exports = sequelize;
