import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../constant/ActionTypes';

const defaultAccount = {
  userName: 'Minhloi',
  password: '123',
}

export const requestLogin = (info) => {
  // console.log('request login')
  // return (dispatch) => {
    // console.log('abc')
    if (info.userName === defaultAccount.userName && info.password === defaultAccount.password) {
      // console.log('success')
      return({
        type: LOGIN_SUCCESS,
      })
    } else {
      // console.log('failed')
      return({
        type: LOGIN_FAILED,
      })
    }
  // }
}