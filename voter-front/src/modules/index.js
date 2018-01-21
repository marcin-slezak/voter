import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import {VOTE, UNVOTE, ADD_PROPOSAL, ADD_POLL, SET_POLLS, SET_USER, CLEAR_POLLS, CLEAR_USER} from './actionTypes';

export function findPollByProposalId (proposalId, polls) {
  return polls.find(poll => poll.proposals.find(proposal => proposal.id === proposalId))
}

export function findPollIndexByProposalId(proposalId, polls){
  return polls.findIndex(poll => poll.proposals.find(proposal => proposal.id === proposalId))
}


const pollsImagesReducer = (state = [], action) => {
  return state;
}

const pollsReducer = (state = [], action) => {

  switch(action.type){
    case CLEAR_POLLS:
      return [];
    case SET_POLLS:
      return [...action.polls];
    case ADD_PROPOSAL:
      let index3 = state.findIndex(poll => poll.id === action.pollId)

      return [
        ...state.slice(0, index3),
        {...state[index3], proposals: [...state[index3].proposals, {id:action.proposalId ,name: action.proposalName, votes:1}]},
        ...state.slice(index3+1)
      ]

    case ADD_POLL:
      return [...state, {
        id: action.pollId,
        img: action.imageUrl,
        title: action.pollName,
        author: action.author,
        open: action.isOpen,
        proposals: action.proposals,
        userVote: action.userVote
      }]  
    case VOTE:
      let index2 = findPollIndexByProposalId(action.proposalId, state)
      return [
        ...state.slice(0, index2),
        {...state[index2], userVote: action.proposalId},
        ...state.slice(index2+1)
      ]
    case UNVOTE:
        let index = state.findIndex(poll => poll.id === action.pollId)
        return [
          ...state.slice(0, index),
          {...state[index], userVote: false},
          ...state.slice(index+1)
        ]
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {

  switch(action.type){
    case CLEAR_USER:
      return {}
    case SET_USER:
      return {id: action.user.id, name: action.user.name}
    default:
      return state;
  }
}

export default combineReducers({
  routing: routerReducer,
  polls: pollsReducer,
  pollsImages: pollsImagesReducer,
  user: userReducer,
  form: formReducer
})
