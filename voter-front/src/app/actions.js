import {VOTE, UNVOTE, ADD_PROPOSAL, ADD_POLL, SET_POLLS, SET_USER, CLEAR_USER, CLEAR_POLLS} from './actionTypes'
import {
        logInAPI,
        getUserAPI, 
        logOutAPI,
        getPollsAPI
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

export function setPollsAction(polls){
    return {
        type: SET_POLLS,
        polls
    }
}

export function setUserAction(user){
    return {
        type: SET_USER,
        user: {id: user.id, name: user.name, is_admin: user.is_admin}
    }
}

// actions with side effect redux-thunk

export function loadPolls(){
    return (dispatch, getState) => {
        return getPollsAPI(getState().user.id).then(data => dispatch(setPollsAction(data)) );//@todo handle error
    }
}

export function logIn(username, password){
    return (dispatch, getState) => {
        return logInAPI(username, password).then( (resp) => {
            if(resp.success === true){
                dispatch(setUserAction( {name: resp.user.username, id: resp.user.id, is_admin: resp.user.is_admin} ))
                dispatch(loadPolls())
                return true;
            }else{
                return false;
            }
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
                dispatch(setUserAction( {name: resp.user.username, id: resp.user.id, is_admin: resp.user.is_admin} ))
                dispatch(loadPolls())
                return true
            }else{
                return false
            }
            //@todo handle error
        })
    }
}