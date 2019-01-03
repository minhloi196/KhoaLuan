import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../constant/ActionTypes';

const initState = {
  registerStatus: 'success',
  message: '',
};

const register = (state = initState, action) => {
  switch (action.type) {
  case REGISTER:
    console.log('-------------register-----------------')
    console.log(action)
    return {
      registerStatus: 'loading',
      message: '',
    }
  case REGISTER_SUCCESS:
    console.log('-------------register-----------------')
    console.log(action)
    return {
      registerStatus: 'success',
      message: '',
    }
  case REGISTER_FAILED:
    console.log('-------------register-----------------')
    console.log(action)
    const tempMessage = action.message.response ? action.message.response.data.message : 'Register failed';
    return {
      registerStatus: 'failed',
      // message: action.message.response.data.message,
      message: tempMessage
    }
  default:
    return state
  }
}

export default register;