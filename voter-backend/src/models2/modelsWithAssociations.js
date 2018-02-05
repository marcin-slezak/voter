exports.get = (sequelize) => {
    const User = require('./userModel').get(sequelize)
    const Poll = require('./pollModel').get(sequelize)
    const Proposal = require('./proposalModel').get(sequelize)
    const Vote = require('./voteModel').get(sequelize)

    Poll.hasMany(Proposal)
    Proposal.belongsTo(Poll)

    User.hasMany(Poll, {as: 'Author', foreignKey: "authorId"})
    Poll.belongsTo(User, {as: 'Author', foreignKey: "authorId"})
    

    Proposal.belongsToMany(User, {through: Vote, as: "Vote"})
    Proposal.hasMany(Vote, {foreignKey: "proposalId"})
    User.belongsToMany(Proposal, {through: Vote, as: "Vote"})

    return {User,Poll,Proposal,Vote}
}

