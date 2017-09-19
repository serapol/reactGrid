import * as actionTypes from '../constants/ActionTypes';

const actions = {
  addUser: (data) => (dispatch) => new Promise((resolve) => {
    dispatch({
      type: actionTypes.ADD_USER,
      data,
    });
    resolve();
  }),

  removeUser: (id) => (dispatch) => new Promise((resolve) => {
    dispatch({
      type: actionTypes.REMOVE_USER,
      id,
    });
    resolve();
  }),

  editUser: (id, data) => (dispatch) => new Promise((resolve) => {
    dispatch({
      type: actionTypes.EDIT_USER,
      id,
      data,
    });
    resolve();
  }),
};

export default actions;
