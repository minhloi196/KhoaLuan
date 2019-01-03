import {
  LOGGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  IGNORE,
} from '../constant/ActionTypes';

const initState = {
  loginStatus: 'failed',
  message: '',
};

const login = (state = initState, action) => {
  switch (action.type) {
  case LOGOUT:
    console.log('log out')
    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('tokenType', '');
    sessionStorage.setItem('userName', '');
    return {
      loginStatus: 'failed',
      message: '',
    }
  case IGNORE:
    return {
      loginStatus: 'failed',
      message: '',
    }
  case LOGGED:
  console.log('loged')
    return {
      loginStatus: 'success',
      message: '',
    }
  case LOGIN:
    return {
      loginStatus: 'loading',
      message: '',
    }
  case LOGIN_SUCCESS:
    sessionStorage.setItem('accessToken', action.data.accessToken);
    sessionStorage.setItem('tokenType', action.data.tokenType);
    sessionStorage.setItem('userName', action.user);
    return {
      loginStatus: 'success',
      message: '',
    }
  case LOGIN_FAILED:
    return {
      loginStatus: 'failed',
      message: 'username or password does correct!',
    }
  default:
    return state
  }
}

export default login;