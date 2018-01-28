import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'


import LogInForm from './LogInForm'
import {logIn as logInAction} from '../app/actions'

import { SubmissionError } from 'redux-form'


let LogIn = props => {
  return (
  <div className="pageContainerNarrow">
    
    <div className="pageContainerNarrowBox">
      <LogInForm onSubmit={(data) => props.logIn(data.login, data.passwd)} />
      <br />
      <Link to="/register">Register user</Link>
    </div>
    
  </div>
  )
}

const mapDispatchToProps = dispatch => {
    return {
      'logIn': (username, password) => dispatch(logInAction(username, password)).then((success) => {
        if(success){
          dispatch(push('/'))    
        }else{
          throw new SubmissionError({ passwd: 'Login failed!', _error: 'Login failed!' })
        } 
      })
    }
  }

  
const mapStateToProps = (state, ownProps) => { 
  return { };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(LogIn)