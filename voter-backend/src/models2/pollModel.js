const Sequelize = require('sequelize');

exports.get = (sequelize) => {
    return sequelize.define('poll', {
        name: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        isOpen: {
            type: Sequelize.BOOLEAN
        }
    })
}
