import {VOTE, UNVOTE, ADD_PROPOSAL, ADD_POLL, SET_POLLS, SET_USER, CLEAR_USER, CLEAR_POLLS} from './actionTypes'
import {findPollByProposalId} from './reducers'
import {
        registerAPI, 
        logInAPI,
        getUserAPI, 
        logOutAPI,
        getPollsAPI,
        unvoteAPI, 
        voteAPI,
        addProposalAPI,
        addPollAPI 
    } from './backendAPI'

export function voteAction(proposalId){
    return {
        type: VOTE,
        proposalId
    }
}

export function clearUserAction(){
    return {
        type: CLEAR_USER
    }
}

export function clearPollsAction(){
    return {
        type: CLEAR_POLLS,
    }
}

export function unvoteAction(pollId){
    return {
        type: UNVOTE,
        pollId
    }
}

export function addProposalAction(proposalId, pollId, proposalName){
    return {
        type: ADD_PROPOSAL,
        proposalId,
        pollId,
        proposalName
    }
}

export function addPollRowAction(pollId, pollName, imageUrl, author, isOpen = true, proposals = [], userVote = false){
    return {
        type: ADD_POLL,
        pollId,
        pollName,
        imageUrl, author, isOpen, proposals, userVote
    }
}


let getRandom = function (list) {
    return list[Math.floor((Math.random()*list.length))];
} 

export function setPollsAction(polls){
    return {
        type: SET_POLLS,
        polls
    }
}

export function setUserAction(user){
    return {
        type: SET_USER,
        user: {id: user.id, name: user.name}
    }
}

// actions with side effect redux-thunk

export function loadPolls(){
    return (dispatch, getState) => {
        return getPollsAPI(getState().user.id).then(data => dispatch(setPollsAction(data)) );//@todo handle error
    }
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


export function logIn(username, password){
    return (dispatch, getState) => {
        return logInAPI(username, password).then( (resp) => {
            if(resp.success === true){
                dispatch(setUserAction( {name: resp.user.username, id: resp.user.id} ))
                dispatch(loadPolls())
                return true;
            }else{
                return false;
            }
        })
    }
}

export function register(username, password){
    return (dispatch, getState) => {
        return registerAPI(username, password).then( (resp) => {
            return resp
        })
    }
}

export function logOut(){
    return (dispatch, getState) => {
        return logOutAPI().then( (resp) => {
            if(resp.success === true){
                dispatch(clearUserAction())
                dispatch(clearPollsAction())
            } //@todo handle error
        })
    }
}

export function checkSession(){
    return (dispatch, getState) => {
        return getUserAPI().then( (resp) => {
            if(resp.success === true){
                dispatch(setUserAction( {name: resp.user.username, id: resp.user.id} ))
                dispatch(loadPolls())
                return true
            }else{
                return false
            }
            //@todo handle error
        })
    }
}