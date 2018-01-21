exports.addProposal = (db, proposalModel) => function(req, res) {
    //@todo check if poll exist
    proposalModel.addProposal(db, req.body.name, req.body.votes, req.body.poll_id)
        .then(insertedId => res.json({success: true, insertedId: insertedId}))
        .catch(err => res.json({success: false, err}))
}