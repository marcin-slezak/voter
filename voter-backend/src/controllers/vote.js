exports.addVote = (voteModel) => function(req, res) {
    voteModel.create({
        userId: req.user.id,
        proposalId: req.body.proposalId
    }).then(vote => {
        res.json({success: true})
    }).catch(err => {
        res.json({success: false, err})
    })
}

exports.deleteVote = (voteModel) => function(req,res){
    voteModel.findOne({
        where: {
            userId: req.user.id,
            proposalId: req.body.proposal_id
        }
    }).then(vote => {
        return vote.destroy().then(und => {
            res.json({success: true})
        })
    }).catch(err => {
        res.json({success: false, err})
    })
}