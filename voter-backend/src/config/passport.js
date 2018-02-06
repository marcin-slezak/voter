var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

exports.configurePassport = (UserModel) => {
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    UserModel.findById(id).then(user => {
      done(null, user);
    }).catch(err => {
      done(err)
    });
  });
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      
      UserModel.findOne({ where: {
        userName: username
      }}).then(user => {
        if(user === null){
          return done(null, false, { message: 'Incorrect username.' })
        }
        if(! UserModel.validPassword(user, password) ){
          return done(null, false, { message: 'Incorrect password.' })
        }
        done(null, user)
      }).catch(err => {
        done(err)
      })

    }
  ))
}