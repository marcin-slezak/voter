exports.getUser = function(req,res){
    if(req.isAuthenticated()){
        res.json({success: true, user: { username: req.user.username, id: req.user.id }});
    }else{
        res.json({success: false, user: false});
    }
}

exports.logout = function(req,res){
    req.logout();
    req.session.destroy();
    res.json({success: true});
}

exports.login =  (passport) => function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json({success: false}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({success: true,  user: { username: req.user.username, id: req.user.id }})
      });
    })(req, res, next);
  }


exports.test = ( userModel) => function(req,res){
    if(req.user){
        res.send('user endpoint + '+ req.user.username)
    }else{
        res.send('user endpoint without login ')
    }
}

exports.register = ( userModel) => function(req,res){
    
    if(req.body.username === undefined){
        res.json({success: false, validation: {username: 'User emails is required'}});
    }else if( req.body.password === undefined){
        res.json({success: false, validation: {password: 'Password is required'}});
    }else{
        userModel.findOne({username: req.body.username}, (err, user)=> {
            if(err){
                res.json({success: false, err});
            }else{
                if(user === false){
                    userModel.addUsers(req.body.username, req.body.password)
                    res.json({success: true});
                }else{
                    res.json({success: false, validation: {username: 'User exist'}});
                }
            }
        })
    }

    
}

