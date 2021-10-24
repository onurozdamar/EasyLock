import * as Actions from '../actions/index';

const initialState = {
  openModal: false,
};

const lockReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {...state, openModal: action.payload};

    default:
      return state;
  }
};

export default lockReducer;
