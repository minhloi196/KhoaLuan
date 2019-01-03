import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { GET_TABLE_COLUMN_API } from '../constant/Apis';
import {
  CLEAR_COLUMN_LIST,
  GET_ALL_COLUMN,
  GET_ALL_COLUMN_SUCCESS,
  GET_ALL_COLUMN_FAILED
} from '../constant/ActionTypes';
import { setAuth } from '../utils';

export const requestGetTableColumn = (tableName) => {

  let userName = sessionStorage.getItem('userName');

  if (tableName === 'Select table') {
    return({
      type: CLEAR_COLUMN_LIST,
    })
  }

  let auth = setAuth();

  let url = GET_TABLE_COLUMN_API.replace('{user}', userName) + 'tablename=' + tableName;
  return (dispatch) => {
    dispatch({
      type: GET_ALL_COLUMN,
    });
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
        type: GET_ALL_COLUMN_SUCCESS,
        columnList: response.data
      })
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_COLUMN_FAILED,
        messageError: error,
      })
    })
  }
}
