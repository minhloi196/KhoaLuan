import {
  GET_TABLE_2,
  GET_TABLE_2_SUCCESS,
  GET_TABLE_2_FAILED,
  CLEAR_DATA,
} from '../constant/ActionTypes';

const initState = {
  loadingTable: 'success',
  messageError: '',
  data: {}
};

const getTable2 = (state = initState, action) => {
  switch (action.type) {
    case GET_TABLE_2:
      return {
        ...state,
        loadingTable: 'loading',
        data: {}
      }
    case GET_TABLE_2_SUCCESS:
      return {
        ...state,
        loadingTable: 'success',
        data: action.data
      }
    case GET_TABLE_2_FAILED:
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

export default getTable2;
