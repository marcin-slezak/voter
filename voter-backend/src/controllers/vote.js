exports.addVote = (db, voteModel) => function(req, res) {
    voteModel.addVote(db, req.body.userId, req.body.proposalId).then(() => res.json({success: true})).catch(err => res.json({success: false, err}))
}

exports.deleteVote = (db, voteModel) => function(req,res){
    if(req.body.user_id === undefined ||req.body.proposal_id === undefined ){
        res.send('missing user_id or proposal_id parameter')
    }else{
        voteModel.deleteVote(db, parseInt( req.body.user_id, 10), parseInt( req.body.proposal_id, 10)).then(() => res.json({success: true})).catch(err => res.json({success: false, err}))
    }
}