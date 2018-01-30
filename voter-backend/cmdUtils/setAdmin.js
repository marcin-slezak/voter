var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('../db/voterdb.sqlite');


if( ! ['add', 'remove'].includes(process.argv[2])){
    throw 'First parameter need to be add or remove'
}


if(process.argv[3] === undefined){
    throw 'User login required as first parameter'
}

let userName = process.argv[3]
let is_admin = process.argv[2] === 'add'? 1 : 0

let setUserAdmin = (userId, isAdmin) => {
    let addUserStmt = db.prepare('UPDATE user SET is_admin = ? WHERE user_id = ?')
    addUserStmt.run(isAdmin, userId)
    addUserStmt.finalize()
}

let getUserByName = (userName, callback = (err, userRow) => {}) => {
    db.get('Select user_id, is_admin from user where username = ? ', userName, function (err, userRow) {            
        if(err){
            callback(err) 
        }else{
            if(userRow){
                callback(null, userRow)
            }else{
                callback('User not found')
            }
        }
    })
}

getUserByName(userName, (err, userRow) => {
    if(err){
        throw err
    }

    if(userRow.is_admin === is_admin && is_admin === 1){
        throw 'User already is admn'
    }

    if(userRow.is_admin === is_admin && is_admin=== 0){
        throw 'User already is not admn'
    }

    setUserAdmin(userRow.user_id, is_admin);

    console.log('User was updated')
})