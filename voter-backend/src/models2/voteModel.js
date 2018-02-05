const Sequelize = require('sequelize');

exports.get = (sequelize) => {
    return  sequelize.define('vote', {})
}
