import React from 'react';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

const renderTextField = ({
    input,
    label,
    onChange,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  const renderDatePicker = ({
    label,
    onChange,
    meta: { touched, error },
    input,
    ...custom
  }) => (
    <DatePicker 
      hintText={label}
      {...input}
      {...custom}
      onChange={ (event, value) => {
          input.onChange(value)
          if (onChange) {
            onChange(value)
          }
        }
      }
     />
  )

  const isEmail = value => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Email required')
  const required = value => (value ? undefined : 'Required')
  const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
  const maxLength30 = maxLength(30)
  const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
  const minLength2 = minLength(2)
  const maxLength100 = maxLength(100)
  const unique = (value, allValues, props) => props.proposals.find(proposal => proposal.name === value) !== undefined ? 'Your proposal already exist' : undefined

  const validateTheSamePasswd = values => {
    const errors = {}
    if (values.passwd !== values.repeatPasswd) {
      errors.repeatPasswd = 'Repeated pssword is not the same'
    }
    return errors
  }

  export  {renderTextField, renderDatePicker, required, maxLength, maxLength30, maxLength100,  minLength, minLength2, unique, validateTheSamePasswd, isEmail};