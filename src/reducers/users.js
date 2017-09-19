import * as actionTypes from '../constants/ActionTypes';
import { v4 } from 'node-uuid';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.data,
            id: v4()
          }
        ]};
    case actionTypes.REMOVE_USER: {
      const newState = {...state};

      newState.data = state.data.filter((user) => user.id !== action.id);

      return newState;
    }
    case actionTypes.EDIT_USER: {
      const newState = {...state};
      const userIndex = state.data.findIndex((user) => user.id === action.id);
      const user = newState.data[userIndex];

      if (user) {
        newState.data[userIndex] = { ...user, ...action.data };
      }

      return newState;
    }
    default:
      return {...state};
  }
}
