import {
  GET_ALL_TABLE,
  GET_ALL_TABLE_SUCCESS,
  GET_ALL_TABLE_FAILED,
} from '../constant/ActionTypes';

const initState = {
  loadingTableList: 'failed',
  tableList: [],
  prefixTable: '',
  messageError: '',
};

const table = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TABLE:
      return {
        ...state,
        loadingTableList: 'loading',
        prefixTable: '',
        tableList: [],
      }
    case GET_ALL_TABLE_SUCCESS:
      return {
        ...state,
        loadingTableList: 'success',
        tableList: action.tableList,
        prefixTable: action.prefixTable,
      }
    case GET_ALL_TABLE_FAILED:
      return {
        loadingTableList: 'failed',
        tableList: [],
        messageError: action.messageError,
        prefixTable: '',
      }
  default:
    return state
  }
}

export default table;
