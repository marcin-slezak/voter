var bcrypt   = require('bcrypt-nodejs');

class User {
    constructor(userId, username, password, db){
        this.id =  userId
        this.username = username
        this.password = password
        this.db = db
        this.randVal = new Date()
    }

    findOne(where = {username: ''}, callback = (err, user) => {}){
        this.db.get('SELECT user_id, username, password FROM user WHERE username = ? ', where.username, function (err, userRow) {
            
            if(err){
                callback(err) 
            }else{
                if(userRow){
                    callback(null, new User(userRow.user_id, userRow.username, userRow.password, this.db))
                }else{
                    callback(null,false)
                }
            }
        })  
    }

    findById(userId, callback = (err, user) => {}){
        this.db.get('SELECT username, password FROM user WHERE user_id = ? ', userId, function (err, userRow) {
            if(err){
                callback(err) 
            }else{
                if(userRow){
                    callback(null, new User(userId, userRow.username, userRow.password, this.db))
                }else{
                    callback(null,false)
                }
            }
        })  
         
    }

    addUsers(username, password) {
        let addUserStmt = this.db.prepare('INSERT INTO user (username, password) VALUES (?, ?)');
        addUserStmt.run(username, this.generateHash(password));
        addUserStmt.finalize()
    }

    validPassword(password){
        return bcrypt.compareSync(password, this.password);
    }

    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    
}

exports.getUserModel = (db) => {
    return new User(null, null, null, db);
}
