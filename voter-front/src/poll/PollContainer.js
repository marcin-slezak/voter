import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import {addVote, unVote, addProposal} from './PollActions';


import PollComponent from './Poll'

const Poll = props => (
  <PollComponent 
    poll={props.poll} 
    proposals={props.proposals}
    vote={props.vote}
    changePage={props.changePage}
    unvote={props.unvote}  
    addProposal={props.addProposal}  
    userVote={props.userVote}
    />
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/poll'),
  vote: (pollId, proposalId) => addVote(pollId, proposalId),
  unvote: proposalId => unVote(proposalId),
  addProposal: (pollId, proposalName) => addProposal(pollId, proposalName)
}, dispatch)

const mapStateToProps = (state, ownProps) => { 
  let id = parseInt( ownProps.match.params.id, 10)
  let poll =  state.polls.find(poll => poll.id === id)
  return { 
    poll: poll,
    proposals: poll.proposals.sort( (prop1, prop2) => prop1.votes < prop2.votes ),
    userVote: poll.userVote
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Poll)