import {addPollRowAction, addProposalAction, voteAction, unvoteAction} from '../app/actions'
import {addPollAPI, addProposalAPI, voteAPI, unvoteAPI} from '../app/backendAPI'
import {findPollByProposalId} from '../app/reducers'

let getRandom = function (list) {
    return list[Math.floor((Math.random()*list.length))];
} 

export function addPoll( pollName,  isOpen = true){
    return (dispatch, getState) => {
        const imageUrl = getRandom(getState().pollsImages);
        const author = getState().user.name;
        return addPollAPI(pollName, imageUrl, author, isOpen).then(resp => {
                if(resp.success === true){
                    dispatch(addPollRowAction(resp.insertedId, pollName, imageUrl, author, isOpen))
                }//@todo handle error
        })
    }
}

export function addProposal(pollId, proposalName){
    return (dispatch, getState) => {
        return addProposalAPI(proposalName, pollId).then(resp => {
                if(resp.success === true){
                    dispatch(addProposalAction(resp.insertedId,pollId, proposalName))
                    dispatch(addVote(pollId,resp.insertedId))
                }//@todo handle error
        })
    }
}

export function addVote(pollId, proposalId){
    return (dispatch, getState) => {
        return voteAPI(getState().user.id,  proposalId).then(resp => {
                if(resp.success === true){
                    dispatch(voteAction(proposalId))
                } //@todo handle error
        })
    }
}

export function unVote(proposalId){
    return (dispatch, getState) => {
        return unvoteAPI(proposalId, getState().user.id).then(resp => {
            if(resp.success === true){
                dispatch(unvoteAction( findPollByProposalId(proposalId, getState().polls).id ))
            } //@todo handle error
        })
    }
}