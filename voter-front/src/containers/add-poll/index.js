import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AddEditPollForm from './AddEditPollForm'
import {addPollToAPI} from '../../modules/actions'

let AddPollComponent = (props) => {

    return (
        <div className="pageContainer">
         <AddEditPollForm onSubmit={(data) => {props.addPoll(data.pollName); props.goHome(); } } />
        </div>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addPoll: (pollName) => addPollToAPI(pollName),
    goHome: () => push('/'),
  }, dispatch)
  
  const mapStateToProps = (state, ownProps) => { 
    return { };
  };
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(AddPollComponent)