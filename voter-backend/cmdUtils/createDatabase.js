const Sequelize = require('sequelize');
const sequelize = new Sequelize('mainDB', null, null, {
    dialect: 'sqlite',
    storage: '../db/voterdb.sqlite',
    operatorsAliases: Sequelize.Op
});

const User = sequelize.define('user', {    
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }
  });

const Poll = sequelize.define('poll', {
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
  

const Proposal = sequelize.define('proposal', {
    name: {
        type: Sequelize.STRING
    }
})

const Vote = sequelize.define('vote', {})

Poll.hasMany(Proposal)
Proposal.belongsTo(Poll)

User.hasMany(Poll, {as: 'Author', foreignKey: "authorId"})

Proposal.belongsToMany(User, {through: Vote, as: "Vote"})
User.belongsToMany(Proposal, {through: Vote, as: "Vote"})

let loadTestData = async () => {
    let user = await User.create({
        userName: "MarcinŚ",
        password: "$2a$08$yT5LQT8Nw3FiCXib4lvn9OIqLB/rDHFxIhRjpd7zIBLIoy9qoCV8q",
        isAdmin: 1
    })

    let poll1 = await Poll.create({
        name: 'Where we should go for integration trip?',
        imageUrl: "/static/media/10.2ec34c0f.jpg",
        isOpen: 1,
        authorId: user.id
    })

    let poll2 = await Poll.create({
        name: 'Top 3 blockers 2018',
        imageUrl: "/static/media/7.8b0b01db.jpg",
        isOpen: 0,
        authorId: user.id
    })

    let proposal1 = await Proposal.create({
        name: "Cracow"    
    })

    await proposal1.setPoll(poll1)

    let proposal2 = await Proposal.create({
        name: "Zakopane"    
    })

    await proposal2.setPoll(poll1)

    
    let proposal3 = await Proposal.create({
        name: "Budged 2018 not signed"    
    })

    await proposal3.setPoll(poll2)

    await user.addVote(proposal2)
}

let createDatabase = async () => {
    await User.sync({force: true})
    await Poll.sync({force:true})
    await Proposal.sync({force:true})
    await Vote.sync({force:true})
}  



let createDatabaseAndLoadTestData = async () => {
     await createDatabase()
     await loadTestData()
    
}

createDatabaseAndLoadTestData();

console.log('EOS')