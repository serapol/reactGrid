import * as actionTypes from '../constants/ActionTypes';
import { push, replace } from 'react-router-redux';

const actions = {
  linkTo: (url, options = {}) => (dispatch) => {
    if (options.replace) {
      dispatch(replace(url));
      return;
    }

    dispatch(push(url));
  },

  showNotification: (message, messageType = 'success') => {
    if (!message) {
      return {
        type: actionTypes.HIDE_NOTIFICATION
      };
    }

    return {
      type: actionTypes.SHOW_NOTIFICATION,
      message,
      messageType
    };
  },

  hideNotification: () => ({
    type: actionTypes.HIDE_NOTIFICATION
  }),
};

export default actions;
