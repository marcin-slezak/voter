exports.addUserVoteInformationToPollRowsPromise = (db, user_id, response) => {
    return new Promise(function(resolve, reject){
        response.map(r => {
            r.userVote = false
            return r
        })
        db.all('SELECT proposal_id FROM vote WHERE user_id = ?', parseInt(user_id, 10), function (err, votesRows) {
            if(err){
                reject(err)
            }else{
                let proposalsIds = votesRows.map(e => e.proposal_id)
    
                response = response.map(p => {
                    if(p.proposals.findIndex(pp => proposalsIds.indexOf(pp.id) > -1 ) > -1 ){
                        p.userVote = p.proposals.find(pp => proposalsIds.indexOf(pp.id) > -1 ).id ;
                    }
                    return p
                })
                
                resolve(response)
            }
        })
    })
}

exports.getPollsRowsPromise = (db) => {
    return new Promise(function(resolve, reject){
        db.all('SELECT poll_id AS id ,name as title, image_url as img, author, is_open as open FROM poll', function (err, pollRows) {
            if(err){
                reject(err)
            }else{
                resolve(pollRows)
            }
        })  
    })
}

exports.addProposalInformationToPollRowsPromise = (db, pollRows) => {
    return new Promise(function(resolve, reject) {
        db.all('SELECT proposal_id as id, name, votes, poll_id FROM proposal', function (err, proposalRows) {
            if(err){
                reject(err)
            }else{
                let response = [];
                pollRows.forEach(poll => {
                    response.push(Object.assign({}, poll, {proposals: proposalRows.filter( proposalItem => proposalItem.poll_id == poll.id) }) );
                });
                resolve(response)
            }
        })
    })
}

exports.addPoll = (db, name, imgUrl,author, isOpen) => new Promise(function(resolve, reject){
    let addPollStmt = db.prepare('INSERT INTO poll (name, image_url, author, is_open) VALUES (?, ?, ?, ?)');
    addPollStmt.run( name, imgUrl, author,  isOpen, (err) => {
        if(err){
            reject(err)
        }else{
            resolve(addPollStmt.lastID)
        }
    });
    addPollStmt.finalize()
})