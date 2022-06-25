require('dotenv').config()
const dbhost = process.env.DB_HOST;
const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;

const Sequelize = require('sequelize');
const connection = new Sequelize(dbname,dbuser,dbpass,{
    host:dbhost,
    dialect:'mysql',
    timezone: '-03:00'
});

module.exports = connection;


