import {
  GET_ALL_DB,
  GET_ALL_DB_SUCCESS,
  GET_ALL_DB_FAILED,
  CLEAR_DATA
} from '../constant/ActionTypes';

const initState = {
  loadingDataBaseList: 'success',
  dataBaseList: [],
  messageError: '',
};

const database = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_DB:
      return {
        ...state,
        loadingDataBaseList: 'loading',
        // prefixDataBase: '',
        dataBaseList: [],
      }
    case GET_ALL_DB_SUCCESS:
      return {
        ...state,
        loadingDataBaseList: 'success',
        dataBaseList: action.dataBaseList,
        // prefixDataBase: action.prefixDataBase,
      }
    case GET_ALL_DB_FAILED:
      return {
        loadingDataBaseList: 'failed',
        dataBaseList: [],
        messageError: action.messageError,
        // prefixDataBase: '',
      }
    case CLEAR_DATA:
      return {
        loadingDataBaseList: 'success',
        dataBaseList: [],
        messageError: '',
      }
  default:
    return state
  }
}

export default database;
