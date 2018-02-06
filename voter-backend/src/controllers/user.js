exports.getUser = function(req,res){
    if(req.isAuthenticated()){
        res.json({success: true, user: { username: req.user.userName, id: req.user.id, is_admin: req.user.isAdmin }});
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
        return res.json({success: true,  user: { username: req.user.userName, id: req.user.id,  is_admin: req.user.isAdmin }})
      });
    })(req, res, next);
  }

exports.register = ( userModel) => function(req,res){
    
    if(req.body.username === undefined){
        res.json({success: false, validation: {username: 'User emails is required'}});
    }else if( req.body.password === undefined){
        res.json({success: false, validation: {password: 'Password is required'}});
    }else{
        userModel.findOne({where: {userName: req.body.username}}).then(user => {
            if(user === null){
                return userModel.create({
                    userName: req.body.username, 
                    password: userModel.generateHash(req.body.password)
                }).then(user => {
                    res.json({success: true});
                })
            }else{
                res.json({success: false, validation: {username: 'User exist'}})
            }
        }).catch(err => {
            res.json({success: false, err});
        })
    }

    
}

