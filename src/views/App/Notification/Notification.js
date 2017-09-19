import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '../../../components';

class Notification extends Component {
  render() {
    const { notification } = this.props.redux.state;
    const { hideNotification } = this.props.redux.actions.GenericActions;

    return (
      <Snackbar
        show={notification.show}
        type={notification.type}
        onHide={hideNotification}
      >
        {notification.message}
      </Snackbar>
    );
  }
}

Notification.propTypes = {
  redux: PropTypes.object,
};

export default Notification;
