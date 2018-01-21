exports.getPoll = (pollModel, db) => function(req,res){
    pollModel.getPollsRowsPromise(db).then(pollRows =>  pollModel.addProposalInformationToPollRowsPromise(db, pollRows)).then(pollRows => {
        if(req.query.user_id !== undefined){
            return pollModel.addUserVoteInformationToPollRowsPromise(db, req.query.user_id, pollRows).then(pollRows => res.json(pollRows))
        }else{
            res.json(pollRows)                
        }
    }).catch(err => {
        res.json({success: false, err});
    })
}

exports.addPoll = (db, pollModel) => function(req, res) {
    pollModel.addPoll(db, req.body.name, req.body.imgUrl, req.body.author, req.body.isOpen)
    .then(insertedId => res.json({success: true, insertedId}))
    .catch(err => res.json({success: false, err}))
    
}