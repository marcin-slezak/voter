// import { read } from 'fs';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3003;
  
var session = require('express-session')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/voterdb.sqlite');
let passport = require('passport')

let pollModel = require('./src/models/pollModel')
let voteModel = require('./src/models/voteModel')
let proposalModel = require('./src/models/proposalModel')
let userModel = require('./src/models/userModel').getUserModel(db)


let homeController = require('./src/controllers/home')
let pollController = require('./src/controllers/poll')
let proposalController = require('./src/controllers/proposal')
let voteController = require('./src/controllers/vote')
let userController = require('./src/controllers/user')

let passportConfig = require('./src/config/passport')
passportConfig.configurePassport(userModel)

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
app.route('/api/poll').get(isLoggedIn, pollController.getPoll(pollModel,db))
app.route('/api/poll').post(isLoggedIn, pollController.addPoll(db, pollModel))
app.route('/api/proposal').post(isLoggedIn, proposalController.addProposal(db,proposalModel))
app.route('/api/vote').post(isLoggedIn, voteController.addVote(db, voteModel))
app.route('/api/vote').delete(isLoggedIn, voteController.deleteVote(db, voteModel))

//open
app.route('/api/user/test').get(userController.test(userModel))  
app.get('/api/user', userController.getUser);
app.route('/api/user/logout').get(userController.logout)
app.post('/api/user/login', userController.login(passport));
app.post('/api/user/register', userController.register(userModel));


;

console.log('todo list RESTful API server started on: ' + port);