import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { QUERY_API } from '../constant/Apis';
import {
  GET_RECORD_LIST,
  GET_RECORD_LIST_SUCCESS,
  GET_RECORD_LIST_FAILED,
} from '../constant/ActionTypes';
import {
  showErrorModal
} from './errorModal';
import { setAuth } from '../utils';

export const requestGetRecordByQueryString = (queryString, databaseName) => {
  let userName = sessionStorage.getItem('userName');
  let url = QUERY_API.replace('{user}', userName);
  url += `querystring=${queryString}&databasename=${databaseName}`;
  let auth = setAuth();

  console.log('get rr', url)

  return (dispatch) => {
    dispatch({
      type: GET_RECORD_LIST,
    })
    // setTimeout( () => {
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
        dispatch({
          type: GET_RECORD_LIST_SUCCESS,
          result: response.data,
        })
      })
      .catch((error) => {
        showErrorModal(error);
        dispatch({
          type: GET_RECORD_LIST_FAILED,
          messageError: error,
        })
      })
    // }, 2000)
  }
}
