exports.addProposal = (proposalModel) => function(req, res) {
    proposalModel.create({
        name: req.body.name,
        pollId: req.body.poll_id
    }).then(proposal => {
        res.json({success: true, insertedId: proposal.id})
    }).catch(err => {
        res.json({success: false, err})
    })
}