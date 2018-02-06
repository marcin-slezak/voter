var express = require('express'),
  app = express(),
  port = process.env.PORT || 3003;
  
var session = require('express-session')
let passport = require('passport')

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mainDB', null, null, {
    dialect: 'sqlite',
    storage: 'db/voterdb.sqlite',
    operatorsAliases: Sequelize.Op
});

({User,Poll,Proposal,Vote} = require('./src/models/modelsWithAssociations').get(sequelize))

let homeController = require('./src/controllers/home')
let pollController = require('./src/controllers/poll')
let proposalController = require('./src/controllers/proposal')
let voteController = require('./src/controllers/vote')
let userController = require('./src/controllers/user')

let passportConfig = require('./src/config/passport')
passportConfig.configurePassport(User)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'my secret love' }));
app.use(passport.initialize());
app.use(passport.session());
app.listen(port);

   
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.send(401, 'missing authorization header');
}

//@todo we have to validate user for each endpoint
//@todo we have to check if error when run query for each endpoint

//protected
app.route('/').get(homeController.mainPage)
app.route('/api/poll').get(isLoggedIn, pollController.getPoll(Poll, User, Proposal, Vote))
app.route('/api/poll').post(isLoggedIn, pollController.addPoll(Poll))
app.route('/api/proposal').post(isLoggedIn, proposalController.addProposal(Proposal))
app.route('/api/vote').post(isLoggedIn, voteController.addVote(Vote))
app.route('/api/vote').delete(isLoggedIn, voteController.deleteVote(Vote))

//open
app.get('/api/user', userController.getUser);
app.route('/api/user/logout').get(userController.logout)
app.post('/api/user/login', userController.login(passport));
app.post('/api/user/register', userController.register(User));


;

console.log('todo list RESTful API server started on: ' + port);