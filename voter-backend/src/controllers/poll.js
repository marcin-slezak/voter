const Sequelize = require('sequelize');
var _ = require('lodash');

exports.getPoll = (pollModel, userModel, proposalModel, voteModel) => function(req,res){

    if(req.query.user_id === undefined){
        return res.json({success: false, msg: 'User id required'});
    }

    pollModel.findAll({
        attributes: [
            'id', 
            ['name', 'title'],
            ['imageUrl', 'img'],
            ['isOpen', 'open']
        ],
        include: [
            {
                model: userModel,
                attributes: ['userName', "id"],
                as: 'Author'
            },
            {
                model: proposalModel            }
        ]
    }).then(polls => {
        return voteModel.findAll({
            where: {
                userId: req.query.user_id
            }
        }).then(votes => {
            res.json(polls.map(poll => {
                let proposalsIds = poll.proposals.map(proposal => proposal.id)
                let votesId = votes.map(vote => vote.proposalId)
                let pollToReturn = poll.get()
                let userVote = _.intersection(proposalsIds,votesId).pop()
                pollToReturn.userVote = userVote? userVote: false 
                return pollToReturn
            }))
        })
    }).catch(err => {
        res.json({success: false, err})
    })
}

exports.addPoll = (pollModel) => function(req, res) {
    pollModel.create({
        name: req.body.name,
        imageUrl: req.body.imgUrl,
        isOpen: req.body.isOpen,
        authorId: req.user.id
    }).then(poll => {
        res.json({success: true, insertedId: poll.id})
    }).catch(err => {
        res.json({success: false, err})
    })
}