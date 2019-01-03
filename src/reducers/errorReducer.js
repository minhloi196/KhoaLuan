import {
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,
} from '../constant/ActionTypes';

const initState = {
  show: 'failed',
  message: '',
};

const error = (state = initState, action) => {
switch (action.type) {
// case LOGIN:
//   return {
//     loginStatus: 'loading',
//     message: '',
//   }
case SHOW_ERROR_MODAL:
  return {
    show: 'true',
    message: action.message,
  }
case HIDE_ERROR_MODAL:
  return {
    show: 'failed',
    message: '',
  }
default:
  return state
}
}

export default error;