import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderTextField,  required,minLength2, maxLength100, } from '../utils/formUtil'

// Material ui
import RaisedButton from 'material-ui/RaisedButton';


let PollForm = (props) => { 
    
    const { handleSubmit, pristine, submitting } = props
    return <div>
                <form onSubmit={handleSubmit}>
                    <h1>Add new poll</h1>
                    <Field
                        name="pollName"
                        component={renderTextField}
                        label="Poll name"
                        validate={[required,minLength2, maxLength100]}
                        autoFocus
                    />
                    <br />
                    <RaisedButton type="submit" className="addPollButton" label="Add poll" primary={true} disabled={pristine || submitting}  />
                </form>
            </div>
  };

export default reduxForm({form: 'PollForm'})(PollForm) 