import {
  GET_RECORD_LIST,
  GET_RECORD_LIST_SUCCESS,
  GET_RECORD_LIST_FAILED,
  CLEAR_DATA,
} from '../constant/ActionTypes';

import { getListKey } from '../utils';

const initState = {
  loadingRecordList: 'failed',
  messageError: '',
  listKey: [],
  data: []
};

const recordList = (state = initState, action) => {
  switch (action.type) {
    case GET_RECORD_LIST:
      return {
        ...state,
        loadingRecordList: 'loading',
        listKey: [],
        data: []
      }
    case GET_RECORD_LIST_SUCCESS:
      return {
        ...state,
        loadingRecordList: 'success',
        listKey: getListKey(action.result),
        data: action.result
      }
    case GET_RECORD_LIST_FAILED:
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

export default recordList;
