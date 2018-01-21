exports.addVote = (db, userId, proposalId) => new Promise(function(resolve, reject){
    let addVoteStmt = db.prepare('INSERT INTO vote (user_id, proposal_id) VALUES (?, ?)');
    addVoteStmt.run( userId,  proposalId,  (err) => {
        if(err){
            reject(err)
        }else{
            resolve()
        }
    })
    addVoteStmt.finalize()
})

exports.deleteVote = (db, userId, proposalId) => new Promise(function(resolve, reject){
    db.run('DELETE FROM vote WHERE user_id = ? AND proposal_id = ?', userId, proposalId, (err) => {
        if(err){
            reject(err)
        }else{
            resolve()
        }
    })
})
