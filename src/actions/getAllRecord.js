import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { QUERY_API } from '../constant/Apis';
import {
  GET_ALL_RECORD,
  GET_ALL_RECORD_SUCCESS,
  GET_ALL_RECORD_FAILED,
} from '../constant/ActionTypes';
import { setAuth } from '../utils';

export const requestGetAllRecord = (databaseName, tableName) => {
  let userName = sessionStorage.getItem('userName');
  let url = QUERY_API.replace('{user}', userName);
  url += `querystring=select * from ${tableName}&databasename=${databaseName}`;
  let auth = setAuth();

  console.log('get all record', url)

  return (dispatch) => {
    dispatch({
      type: GET_ALL_RECORD,
    })
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
        console.log('minh loi', response)
        dispatch({
          type: GET_ALL_RECORD_SUCCESS,
          result: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ALL_RECORD_FAILED,
          messageError: error,
        })
      })
    }, 2000)
  }
}
