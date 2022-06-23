const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('users',{ 
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    link:{
        type: Sequelize.STRING,
        allowNull: false
    },
    points:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.sync({force:false});

module.exports = User;