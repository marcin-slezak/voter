const Sequelize = require('sequelize');

exports.get = (sequelize) => {
    return sequelize.define('proposal', {
        name: {
            type: Sequelize.STRING
        }
    })
}
