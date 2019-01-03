import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { REGISTER_API } from '../constant/Apis';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../constant/ActionTypes';

//** Handle register
//  * @param name : minhloi,
//  * @param username: minhloi,
//  * @param email: email@emil.com,
//  * @param password: 123456
//  */

// {"success":false,"message":"Username is already taken!"}

export const requestRegister = (info) => {
  console.log('request register', info);
  let url = REGISTER_API;

  return (dispatch) => {
    dispatch({
      type: REGISTER,
    });
    axios({
      method: 'post',
      url: SERVER_HOST + url,
      data: {
        'name': info.userName,
        'username': info.userName,
        'email': info.email,
        'password': info.password,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // console.log('-------------------------------')
      // console.log('respone', response)
      // if (response.data.success === 'true') {
      //   console.log('--------------minh loi success true---------------')
        dispatch({
          type: REGISTER_SUCCESS,
        })
      // } else {
      //   console.log('--------------minh loi success false---------------')
      //   dispatch({
      //     type: REGISTER_FAILED,
      //     message: response.message.data,
      //   })
      // }
    })
    .catch((err) => {
      console.log('----------check here register failse----------')
      console.log(err)
      dispatch({
        type: REGISTER_FAILED,
        message: err
      })
    })
  }
}
