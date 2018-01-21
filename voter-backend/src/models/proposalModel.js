exports.addProposal = (db, name, votes, pollId) => new Promise(function(resolve, reject) {
    //@todo check if poll exist
    let addProposalStmt = db.prepare('INSERT INTO proposal (name, votes, poll_id) VALUES (?, ?, ?)');
    addProposalStmt.run( name,  votes,  pollId,  (err) => {
        if(err){
            reject(err)
        }else{
            resolve(addProposalStmt.lastID)
        }
        
    });
    addProposalStmt.finalize()
})