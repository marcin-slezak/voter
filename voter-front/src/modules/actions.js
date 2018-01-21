import {VOTE, UNVOTE, ADD_PROPOSAL, ADD_POLL, SET_POLLS, SET_USER, CLEAR_USER, CLEAR_POLLS} from './actionTypes'
import {findPollByProposalId} from './index'

export function vote(proposalId){
    return {
        type: VOTE,
        proposalId
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER
    }
}

export function clearPolls(){
    return {
        type: CLEAR_POLLS,
    }
}

export function unvote(pollId){
    return {
        type: UNVOTE,
        pollId
    }
}

export function addProposal(proposalId, pollId, proposalName){
    return {
        type: ADD_PROPOSAL,
        proposalId,
        pollId,
        proposalName
    }
}

export function addPollRow(pollId, pollName, imageUrl, author, isOpen = true, proposals = [], userVote = false){
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

export function setPolls(polls){
    return {
        type: SET_POLLS,
        polls
    }
}

export function setUser(user){
    return {
        type: SET_USER,
        user: {id: user.id, name: user.name}
    }
}

// actions with side effect redux-thunk

export function loadPollsFromAPI(){
    return (dispatch, getState) => {
        return getPollsAPI(getState().user.id).then(function(response) {
            response.json().then(data => dispatch(setPolls(data)) )
        });//@todo handle error
    }
}

export function addPollToAPI( pollName,  isOpen = true){
    return (dispatch, getState) => {
        const imageUrl = getRandom(getState().pollsImages);
        const author = getState().user.name;
        return addPollAPI(pollName, imageUrl, author, isOpen).then(resp => {
                if(resp.success === true){
                    dispatch(addPollRow(resp.insertedId, pollName, imageUrl, author, isOpen))
                }//@todo handle error
        })
    }
}

export function addProposalToAPI(pollId, proposalName){
    return (dispatch, getState) => {
        return addProposalAPI(proposalName, pollId).then(resp => {
                if(resp.success === true){
                    dispatch(addProposal(resp.insertedId,pollId, proposalName))
                    dispatch(addVoteToAPI(pollId,resp.insertedId))
                }//@todo handle error
        })
    }
}

export function addVoteToAPI(pollId, proposalId){
    return (dispatch, getState) => {
        return voteAPI(getState().user.id,  proposalId).then(resp => {
                if(resp.success === true){
                    dispatch(vote(proposalId))
                } //@todo handle error
        })
    }
}

export function unVoteToAPI(proposalId){
    return (dispatch, getState) => {
        return unvoteAPI(proposalId, getState().user.id).then(resp => {
            if(resp.success === true){
                dispatch(unvote( findPollByProposalId(proposalId, getState().polls).id ))
            } //@todo handle error
        })
    }
}


export function logInAPI(username, password){
    return (dispatch, getState) => {
        return logIn(username, password).then( (resp) => {
            if(resp.success === true){
                dispatch(setUser( {name: resp.user.username, id: resp.user.id} ))
                dispatch(loadPollsFromAPI())
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
                dispatch(clearUser())
                dispatch(clearPolls())
            } //@todo handle error
        })
    }
}

export function checkSession(){
    return (dispatch, getState) => {
        return getUserAPI().then( (resp) => {
            if(resp.success === true){
                dispatch(setUser( {name: resp.user.username, id: resp.user.id} ))
                dispatch(loadPollsFromAPI())
                return true
            }else{
                return false
            }
            //@todo handle error
        })
    }
}

// ####################   API #########################################

const registerAPI = (username, password) => {
    return fetch('/api/user/register', {
        method: 'POST',  
        headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json',},
        credentials: 'include', 
        body: JSON.stringify({username: username, password})}).then(response => response.json());
}

const logIn = (username, password) => {
    return fetch('/api/user/login', {
        method: 'POST',  
        headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json',},
        credentials: 'include', 
        body: JSON.stringify({username: username, password})}).then(response => response.json());
}

const getUserAPI = (username, password) => {
    return fetch('/api/user', {
        credentials: 'include',     
    }).then(response => response.json());
}

const logOutAPI = (username, password) => {
    return fetch('/api/user/logout', {
        credentials: 'include',     
    }).then(response => response.json());
}

const getPollsAPI = (userId) => {
    return fetch('/api/poll?user_id='+userId, {credentials: 'include'})
}

const unvoteAPI = (proposalId, userId) => fetch('/api/vote', {
        method: 'DELETE',  
        headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({user_id: userId ,proposal_id: proposalId})
    }).then(response => response.json())

const voteAPI = (userId, proposalId) => fetch('/api/vote', {
    method: 'POST',  
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}, 
    credentials: 'include',
    body: JSON.stringify({userId ,proposalId})
}).then(response => response.json())

const addProposalAPI = (proposalName, pollId) => fetch('/api/proposal', {
    method: 'POST',  
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}, 
    credentials: 'include',
    body: JSON.stringify({name: proposalName,votes: 1, poll_id: pollId})
}).then(response => response.json())

const addPollAPI = (pollName, imageUrl, author, isOpen) => fetch('/api/poll', {
    method: 'POST',  
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}, 
    credentials: 'include',
    body: JSON.stringify({name: pollName, imgUrl: imageUrl, author, isOpen})
}).then(response => response.json()) 
