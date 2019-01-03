import axios from 'axios';

import { SERVER_HOST } from '../setting';
import { UPLOAD_CSV_FILE, UPLOAD_DUMP_FILE } from '../constant/Apis';
import {
  IMPORT_FILE,
  IMPORT_FILE_SUCCESS,
  IMPORT_FILE_FAILED,
  CLEAR_DATA_MODAL_IMPORT
} from "../constant/ActionTypes";
import { setAuth } from '../utils';

export const requestImportFile = (data, file) => {
  let userName = sessionStorage.getItem('userName');
  let url;
  if (data.importMode === 'csv file') {
    url = UPLOAD_CSV_FILE;
  } else {
    url = UPLOAD_DUMP_FILE;
  }
  url = url.replace('{user}', userName);

  let auth = setAuth();
  let formData = new FormData();

  formData.append('file', file);
  formData.append('username', userName);
  formData.append('databasename', data.databaseName);
  if (data.importMode === 'csv file') {
    formData.append('tablename', data.tableName);
  }

  return (dispatch) => {
    dispatch({
      type: IMPORT_FILE,
    });
    axios.post(
      SERVER_HOST + url,
      formData,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          'Authorization': auth,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: IMPORT_FILE_SUCCESS,
      })
    })
    .catch((err) => {
      dispatch({
        type: IMPORT_FILE_FAILED,
        messageError: err
      })
    })
  }
};

export const clearData = () => {
  return({
    type: CLEAR_DATA_MODAL_IMPORT
  })
}
