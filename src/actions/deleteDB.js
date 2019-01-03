import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { DELETE_DATABASE_API } from '../constant/Apis';
import {
  DELETE_DATABASE,
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAILED,
} from "../constant/ActionTypes";
import { setAuth } from '../utils';

export const requestDeleteDB = (databaseName) => {
  let userName = sessionStorage.getItem('userName');
  let url = DELETE_DATABASE_API;
  url = url.replace('{user}', userName);
  const userDB = userName + '_' + databaseName;
  url = url.replace('{databasename}', userDB);
  let auth = setAuth();

  return (dispatch) => {
    dispatch({
      type: DELETE_DATABASE,
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
      dispatch({
        type: DELETE_DATABASE_SUCCESS,
      })
    })
    .catch((err) => {
      dispatch({
        type: DELETE_DATABASE_FAILED,
        messageError: err
      })
    })
  }, 2000)
  }
};
