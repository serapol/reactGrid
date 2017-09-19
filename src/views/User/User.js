import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormValidation } from '../../decorators';
import { Input, Button } from '../../components';

const validationRules = {
  'name': [
    'required',
  ],
  'email': [
    'required',
    'email',
  ],
  'phone': [
    'required',
  ],
};

class UserView extends Component {
  state = {
    formData: {
      name: '',
      phone: '',
      email: '',
    }
  };

  handleSubmit = (e) => {
    const { addUser } = this.props.redux.actions.UsersActions;
    const { linkTo, showNotification } = this.props.redux.actions.GenericActions;
    const { validate } = this.props;
    const { user } = this.props.redux.state;
    const { formData } = this.state;
    const isNew = !user;

    e.preventDefault();

    if (!validate(formData)) return;

    addUser(this.state.formData)
      .then(() => {
        showNotification(isNew ? 'User was successfully added' : 'User was successfully saved');
        linkTo('/');
      });
  };

  handleInputChange = (fieldValue, fieldName) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [fieldName]: fieldValue,
      },
    });

    this.props.validate({ [fieldName]: fieldValue });
  };
  render() {
    const { getValidationState } = this.props;
    const { user } = this.props.redux.state;
    const isNew = !user;

    return (
      <div className="user-view">
        <h1>{isNew ? 'Add new user' : 'Edit user'}</h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <Input
            name="name"
            defaultValue={user ? user.name : ''}
            placeholder="Enter your name"
            validationState={getValidationState('name').state}
            errorMessage={getValidationState('name').message}
            onInput={this.handleInputChange}
          />
          <Input
            name="phone"
            defaultValue={user ? user.phone : ''}
            placeholder="Enter your phone"
            validationState={getValidationState('phone').state}
            errorMessage={getValidationState('phone').message}
            onInput={this.handleInputChange}
          />
          <Input
            name="email"
            defaultValue={user ? user.email : ''}
            placeholder="Enter your e-mail"
            validationState={getValidationState('email').state}
            errorMessage={getValidationState('email').message}
            onInput={this.handleInputChange}
          />
          <Button
            type="primary"
          >
            {isNew ? 'Add user' : 'Save changes'}
          </Button>
        </form>
      </div>
    );
  }
}

UserView.propTypes = {
  redux: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  getValidationState: PropTypes.func.isRequired,
};

export default withFormValidation(UserView, validationRules);
