import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { LOGIN_API } from '../constant/Apis';
import {
  LOGGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  IGNORE,
} from '../constant/ActionTypes';

const defaultAccount = {
  userName: '',
  password: '',
}

// export const isLogged = () => {
//     let accessToken = sessionStorage.getItem('accessToken');
//     let tokenType = sessionStorage.getItem('tokenType');

//     console.log('-----check here--------')
//     console.log('token', accessToken)
//     console.log('tokenType', tokenType)

//     if ((accessToken !== null && tokenType !== null) &&
//       (accessToken !== '' && tokenType !== '')) {
//       return ({
//         type: LOGGED,
//       })
//     }

//     return({
//       type: IGNORE,
//     })
// }

export const requestLogin = (info) => {
  console.log('request login', info);
  let url = LOGIN_API;

  // let formData = new FormData();

  // formData.append('usernameOrEmail', info.userName);
  // formData.append('password', info.password);

  // let body = {
  //   'usernameOrEmail': info.userName,
  //   'password': info.password,
  // }
  // formData.append('usernameOrEmail', info.userName);
  // formData.append('password', info.password);

  

  // console.log('-----check here--------')
  // console.log('token', accessToken)
  // console.log('tokenType', tokenType)

  // if (accessToken !== null && tokenType !== null) {
  //   return ({
  //     type: LOGGED,
  //   })
  // }

  if (info === undefined) {
    let accessToken = sessionStorage.getItem('accessToken');
    let tokenType = sessionStorage.getItem('tokenType');

    console.log('-----check here--------')
    console.log('token', accessToken)
    console.log('tokenType', tokenType)

    if ((accessToken !== null && tokenType !== null) &&
      (accessToken !== '' && tokenType !== '')) {
      return ({
        type: LOGGED,
      })
    }

    return({
      type: IGNORE,
    })
  }

  return (dispatch) => {
    dispatch({
      type: LOGIN,
    });
    axios({
      method: 'post',
      url: SERVER_HOST + url,
      data: {
        'usernameOrEmail': info.userName,
        'password': info.password,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('-------------------------------')
      console.log(response)
      dispatch({
        type: LOGIN_SUCCESS,
        data: response.data,
        user: info.userName,
      })
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILED,
        messageError: err
      })
    })
  }
}
