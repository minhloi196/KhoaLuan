import {
  GET_TABLE_3,
  GET_TABLE_3_SUCCESS,
  GET_TABLE_3_FAILED,
  CLEAR_DATA,
} from '../constant/ActionTypes';

const initState = {
  loadingTable: 'success',
  messageError: '',
  data: {}
};

const getTable3 = (state = initState, action) => {
  switch (action.type) {
    case GET_TABLE_3:
      return {
        ...state,
        loadingTable: 'loading',
        data: {}
      }
    case GET_TABLE_3_SUCCESS:
      return {
        ...state,
        loadingTable: 'success',
        data: action.data
      }
    case GET_TABLE_3_FAILED:
      return {
        loadingTable: 'failed',
        data: {},
        messageError: 'Format of table is wrong!',
      }
    case CLEAR_DATA:
      return {
        loadingTable: 'success',
        data: {},
        messageError: ''
      }
  default:
    return state
  }
}

export default getTable3;
