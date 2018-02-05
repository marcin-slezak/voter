const Sequelize = require('sequelize');
const bcrypt   = require('bcrypt-nodejs');

exports.get = (sequelize) => {
    let UserModel = sequelize.define('user', {
        userName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        }
    })

    UserModel.validPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }

    UserModel.generateHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    return UserModel
}



