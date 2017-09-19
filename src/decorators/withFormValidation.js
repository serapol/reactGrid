import React, { Component } from 'react';
import { EMAIL_REGEXP } from '../constants/Regexp';
import { PASSWORD_REGEXP } from '../constants/Regexp';

const validationHandlers = {
  required: (value) => {
    if (!value) {
      return 'Field cannot be empty';
    }

    return '';
  },

  email: (value) => {
    if (value && !EMAIL_REGEXP.test(value)) {
      return 'Email address should be valid!';
    }

    return '';
  },

  password: (value) => {
    if (!value) return false;

    if (value.length < 8) {
      return 'Password should be at least 8 symbols length!';
    }

    if (value.length > 100) {
      return 'Password should be maximum 100 symbols length!';
    }

    if (value && !PASSWORD_REGEXP.test(value)) {
      return 'Password can contain all latin alphabetical chars, numeric and some special chars!';
    }

    return '';
  }
};

export default (WrappedComponent, validations) =>
  class withFormValidation extends Component {
    state = {
      validationStates: {}
    };

    validate = (fields) => {
      const fieldsNames = Object.keys(fields);
      let validationStates = {};
      let isValid = true;

      fieldsNames.forEach((fieldName) => {
        const fieldValue = fields[fieldName];
        const error = this.getValidationError(fieldName, fieldValue);

        validationStates[fieldName] = {
          state: error ? 'error' : 'success',
          message: error ? error : '',
        };

        if (error) {
          isValid = false;
        }
      });

      this.setState({
        validationStates
      });

      return isValid;
    };

    getValidationError = (fieldName, fieldValue) => {
      const rules = validations[fieldName];
      let error = null;

      rules.some((rule) => {
        error = validationHandlers[rule](fieldValue);

        return !!error;
      });

      return error;
    };

    getValidationState = (fieldName) => this.state.validationStates[fieldName] || {};

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getValidationState={this.getValidationState}
          validate={this.validate}
        />
      );
    }
  };
