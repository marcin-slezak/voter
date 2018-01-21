import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderTextField, required,minLength2, maxLength30, unique} from '../../modules/formUtil'

// Material ui
import RaisedButton from 'material-ui/RaisedButton';

let AddNewProposalForm = (props) => { 
    
    const { handleSubmit, pristine, submitting } = props
    return <div>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="proposalName"
                        component={renderTextField}
                        label="Add own proposal"
                        validate={[required,minLength2, maxLength30, unique]}
                        autoFocus
                        />
                    <RaisedButton type="submit" className="addProposalButton" label="Add proposal" primary={true} disabled={pristine || submitting}  />
                </form>
            </div>
  };

export default reduxForm({form: 'addProposal'})(AddNewProposalForm) 