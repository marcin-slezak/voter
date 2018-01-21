import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderTextField,  required,minLength2, maxLength100, } from '../../modules/formUtil'

// Material ui
import RaisedButton from 'material-ui/RaisedButton';


let LogInForm = (props) => { 
    
    const { handleSubmit, pristine, submitting, reset } = props
    return <div>
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <Field
                        name="login"
                        component={renderTextField}
                        label="Login"
                        validate={[required,minLength2, maxLength100]}
                        autoFocus 
                    />
                    <br />
                    <Field
                        name="passwd"
                        component={renderTextField}
                        label="Password"
                        type="password"
                        validate={[required,minLength2, maxLength100]}
                    />
                    <br /><br />
                    <RaisedButton type="submit" className="logInButton" label="Log In" primary={true} disabled={pristine || submitting}  />
                    <RaisedButton className="clearButton" label="Clear values" onClick={reset} />
                </form>
            </div>
  };

export default reduxForm({form: 'LogInForm'})(LogInForm) 