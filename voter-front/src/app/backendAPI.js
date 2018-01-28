export const registerAPI = (username, password) => {
    return fetch('/api/user/register', {
        method: 'POST',  
        headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json',},
        credentials: 'include', 
        body: JSON.stringify({username: username, password})}).then(response => response.json());
}

export const logInAPI = (username, password) => {
    return fetch('/api/user/login', {
        method: 'POST',  
        headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json',},
        credentials: 'include', 
        body: JSON.stringify({username: username, password})}).then(response => response.json());
}

export const getUserAPI = (username, password) => {
    return fetch('/api/user', {
        credentials: 'include',     
    }).then(response => response.json());
}

export const logOutAPI = (username, password) => {
    return fetch('/api/user/logout', {
        credentials: 'include',     
    }).then(response => response.json());
}

export const getPollsAPI = (userId) => {
    return fetch('/api/poll?user_id='+userId, {credentials: 'include'}).then(response => response.json())
}

export const unvoteAPI = (proposalId, userId) => fetch('/api/vote', {
        method: 'DELETE',  
        headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({user_id: userId ,proposal_id: proposalId})
    }).then(response => response.json())

export const voteAPI = (userId, proposalId) => fetch('/api/vote', {
    method: 'POST',  
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}, 
    credentials: 'include',
    body: JSON.stringify({userId ,proposalId})
}).then(response => response.json())

export const addProposalAPI = (proposalName, pollId) => fetch('/api/proposal', {
    method: 'POST',  
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}, 
    credentials: 'include',
    body: JSON.stringify({name: proposalName,votes: 1, poll_id: pollId})
}).then(response => response.json())

export const addPollAPI = (pollName, imageUrl, author, isOpen) => fetch('/api/poll', {
    method: 'POST',  
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}, 
    credentials: 'include',
    body: JSON.stringify({name: pollName, imgUrl: imageUrl, author, isOpen})
}).then(response => response.json()) 

