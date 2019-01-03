import {
  GET_RECORD_LIST_SECOND,
  GET_RECORD_LIST_SUCCESS_SECOND,
  GET_RECORD_LIST_FAILED_SECOND,
  CLEAR_DATA,
} from '../constant/ActionTypes';

import { getListKey } from '../utils';

const initState = {
  loadingRecordList: 'failed',
  messageError: '',
  listKey: [],
  data: []
};

const dataSetSecond = (state = initState, action) => {
  switch (action.type) {
    case GET_RECORD_LIST_SECOND:
      return {
        ...state,
        loadingRecordList: 'loading',
        listKey: [],
        data: []
      }
    case GET_RECORD_LIST_SUCCESS_SECOND:
      return {
        ...state,
        loadingRecordList: 'success',
        listKey: getListKey(action.result),
        data: action.result
      }
    case GET_RECORD_LIST_FAILED_SECOND:
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

export default dataSetSecond;
