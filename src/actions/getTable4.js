import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { GET_TABLE_4_API } from '../constant/Apis';
import {
  GET_TABLE_4,
  GET_TABLE_4_SUCCESS,
  GET_TABLE_4_FAILED,
} from "../constant/ActionTypes";
import { setAuth } from '../utils';

export const requestGetTable4 = (databaseName, tableName) => {
  let userName = sessionStorage.getItem('userName');
  let url = GET_TABLE_4_API;
  url = url.replace('{user}', userName);
  url = url.replace('{databasename}', databaseName);
  url = url.replace('{tablename}', tableName);
  let auth = setAuth();

  console.log('call api get table 4')

  return (dispatch) => {
    dispatch({
      type: GET_TABLE_4,
    });
    setTimeout( () => {
    axios({
      baseURL: SERVER_HOST,
      method: 'get',
      url: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': auth,
      }
    })
    .then((response) => {
      console.log('=====get table 4========')
      console.log(response)
      dispatch({
        type: GET_TABLE_4_SUCCESS,
        data: response.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_TABLE_4_FAILED,
        messageError: err
      })
    })
  }, 2000)
  }
};
