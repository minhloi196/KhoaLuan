import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { GET_USER_TABLE_API } from '../constant/Apis';
import {
  GET_ALL_TABLE,
  GET_ALL_TABLE_SUCCESS,
  GET_ALL_TABLE_FAILED,
} from '../constant/ActionTypes';
import { convertTableList, getPrefixTable, setAuth } from '../utils';

export const requestGetAllTable = () => {
  let userName = sessionStorage.getItem('userName');
  let url = GET_USER_TABLE_API.replace('{user}', userName);
  let auth = setAuth();

  return (dispatch) => {
    dispatch({
      type: GET_ALL_TABLE,
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
        dispatch({
          type: GET_ALL_TABLE_SUCCESS,
          tableList: convertTableList(response.data),
          prefixTable: getPrefixTable(response.data),
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ALL_TABLE_FAILED,
          messageError: error,
        })
      })
    }, 2000)
  }
}
