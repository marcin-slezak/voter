import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import PollForm from './PollForm'
import {addPoll} from './PollActions'

let AddPollComponent = (props) => {

    return (
        <div className="pageContainer">
         <PollForm onSubmit={(data) => {props.addPoll(data.pollName); props.goHome(); } } />
        </div>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addPoll: (pollName) => addPoll(pollName),
    goHome: () => push('/'),
  }, dispatch)
  
  const mapStateToProps = (state, ownProps) => { 
    return { };
  };
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(AddPollComponent)