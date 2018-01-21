import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderTextField,  required,minLength2, maxLength100, validateTheSamePasswd, isEmail } from '../../modules/formUtil'

// Material ui
import RaisedButton from 'material-ui/RaisedButton';


let RegisterForm = (props) => { 
    
    const { handleSubmit, pristine, submitting, reset } = props
    return <div>
                <form onSubmit={handleSubmit}>
                    <h1>Register user</h1>
                    <Field
                        name="login"
                        component={renderTextField}
                        label="Login"
                        validate={[required,minLength2, maxLength100, isEmail]}
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
                    <Field
                        name="repeatPasswd"
                        component={renderTextField}
                        label="Reapeat password"
                        type="password"
                        validate={[required,minLength2, maxLength100]}
                    />
                    <br /><br />
                    <RaisedButton type="submit" className="regiserInButton" label="Register" primary={true} disabled={pristine || submitting}  />
                    <RaisedButton className="clearButton" label="Clear values" onClick={reset} />
                </form>
            </div>
  };

export default reduxForm({form: 'RegisterForm', validate: validateTheSamePasswd})(RegisterForm) 