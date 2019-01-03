import {
  GET_RECORD_LIST_FIRST,
  GET_RECORD_LIST_SUCCESS_FIRST,
  GET_RECORD_LIST_FAILED_FIRST,
  CLEAR_DATA,
} from '../constant/ActionTypes';

import { getListKey } from '../utils';

const initState = {
  loadingRecordList: 'failed',
  messageError: '',
  listKey: [],
  data: []
};

const dataSetFiRst = (state = initState, action) => {
  switch (action.type) {
    case GET_RECORD_LIST_FIRST:
      return {
        ...state,
        loadingRecordList: 'loading',
        listKey: [],
        data: []
      }
    case GET_RECORD_LIST_SUCCESS_FIRST:
      return {
        ...state,
        loadingRecordList: 'success',
        listKey: getListKey(action.result),
        data: action.result
      }
    case GET_RECORD_LIST_FAILED_FIRST:
      return {
        loadingRecordList: 'failed',
        listKey: [],
        data: [],
        messageError: action.messageError,
      }
    case CLEAR_DATA:
      return {
        loadingRecordList: 'success',
        listKey: [],
        data: [],
        messageError: ''
      }
  default:
    return state
  }
}

export default dataSetFiRst;
