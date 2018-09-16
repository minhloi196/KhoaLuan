import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../constant/ActionTypes';

const initState = {
    loginStatus: 'failed',
    message: '',
};

const login = (state = initState, action) => {
    switch (action.type) {
    case LOGIN:
        return {
            loginStatus: 'loading',
            message: '',
        }
    case LOGIN_SUCCESS:
        return {
            loginStatus: 'success',
            message: '',
        }
    case LOGIN_FAILED:
        // console.log('dispatch action')
        return {
            loginStatus: 'failed',
            message: 'username or password does correct!',
        }
    default:
        return state
    }
}

export default login;