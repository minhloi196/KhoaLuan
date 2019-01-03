import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { QUERY_API } from '../constant/Apis';
import {
  GET_RECORD_LIST_FIRST,
  GET_RECORD_LIST_SUCCESS_FIRST,
  GET_RECORD_LIST_FAILED_FIRST,
  GET_RECORD_LIST_SECOND,
  GET_RECORD_LIST_SUCCESS_SECOND,
  GET_RECORD_LIST_FAILED_SECOND,
} from '../constant/ActionTypes';
import {
  showErrorModal
} from './errorModal';
import { setAuth } from '../utils';

export const requestFirstDataSet = (queryString, databaseName) => {
  let userName = sessionStorage.getItem('userName');
  let url = QUERY_API.replace('{user}', userName);
  url += `querystring=${queryString}&databasename=${databaseName}`;
  let auth = setAuth();

  console.log('get rr', url)

  return (dispatch) => {
    dispatch({
      type: GET_RECORD_LIST_FIRST,
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
          type: GET_RECORD_LIST_SUCCESS_FIRST,
          result: response.data,
        })
      })
      .catch((error) => {
        showErrorModal(error);
        dispatch({
          type: GET_RECORD_LIST_FAILED_FIRST,
          messageError: error,
        })
      })
    // }, 2000)
  }
}

export const requestSecondDataSet = (queryString, databaseName) => {
  let userName = sessionStorage.getItem('userName');
  let url = QUERY_API.replace('{user}', userName);
  url += `querystring=${queryString}&databasename=${databaseName}`;
  let auth = setAuth();

  console.log('get rr', url)

  return (dispatch) => {
    dispatch({
      type: GET_RECORD_LIST_SECOND,
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
          type: GET_RECORD_LIST_SUCCESS_SECOND,
          result: response.data,
        })
      })
      .catch((error) => {
        showErrorModal(error);
        dispatch({
          type: GET_RECORD_LIST_FAILED_SECOND,
          messageError: error,
        })
      })
    // }, 2000)
  }
}
