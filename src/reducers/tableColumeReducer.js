import {
  GET_ALL_COLUMN,
  GET_ALL_COLUMN_SUCCESS,
  GET_ALL_COLUMN_FAILED
} from '../constant/ActionTypes';

const initState = {
  loadingColumnList: 'failed',
  columnList: [],
  messageError: '',
};

const tableColumn = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_COLUMN:
      return {
        ...state,
        loadingColumnList: 'loading',
        columnList: [],
      }
    case GET_ALL_COLUMN_SUCCESS:
      return {
        ...state,
        loadingColumnList: 'success',
        columnList: action.columnList,
      }
    case GET_ALL_COLUMN_FAILED:
      console.log('get list failed')
      return {
        loadingColumnList: 'failed',
        columnList: [],
        messageError: action.messageError
      }
  default:
    return state
  }
}

export default tableColumn;