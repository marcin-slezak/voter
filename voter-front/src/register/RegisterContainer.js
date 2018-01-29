import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

import RegisterForm from './RegisterForm'
import {logIn} from '../app/actions'
import {register} from '../register/RegisterActions'

import { SubmissionError } from 'redux-form'


let Register = props => {
  return (
  <div className="pageContainerNarrow">
    
    <div className="pageContainerNarrowBox">
      <RegisterForm onSubmit={(data) => props.register(data.login, data.passwd)} />
      <br />
      <Link to="/log-in">Log In</Link>
    </div>
    
  </div>
  )
}


const redirectToHomeIfSuccessOrDisplayFeedback = (dispatch) => (resp) => {
  if(resp.success === true){
    dispatch(push('/'))    
    return true
  }else{
    throw new SubmissionError({ login: resp.validation.username, _error: resp.validation.username })
  } 
}

const mapDispatchToProps = dispatch => {
    return {
      'register': (username, password) => dispatch(register(username, password))
                                            .then(redirectToHomeIfSuccessOrDisplayFeedback(dispatch))
                                            .then(() => dispatch(logIn(username, password)))
                                            .then(() => dispatch(push('/')))
    }
  }

  
const mapStateToProps = (state, ownProps) => { 
  return { };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Register)