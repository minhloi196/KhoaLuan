import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { GET_USER_DB_API } from '../constant/Apis';
import {
  GET_ALL_DB,
  GET_ALL_DB_SUCCESS,
  GET_ALL_DB_FAILED,
} from '../constant/ActionTypes';
import { convertTableList, getPrefixTable, setAuth } from '../utils';

export const requestGetAllDB = () => {
  let userName = sessionStorage.getItem('userName');
  let url = GET_USER_DB_API.replace('{user}', userName);
  let auth = setAuth();

  return (dispatch) => {
    dispatch({
      type: GET_ALL_DB,
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
        console.log('-------respose database')
        console.log(response)
        dispatch({
          type: GET_ALL_DB_SUCCESS,
          dataBaseList: response.data,
          // dataBaseList: convertTableList(response.data),
          // prefixDataBase: getPrefixTable(response.data),
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ALL_DB_FAILED,
          messageError: error,
        })
      })
    }, 2000)
  }
}
