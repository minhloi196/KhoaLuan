import {
  GET_ALL_RECORD,
  GET_ALL_RECORD_SUCCESS,
  GET_ALL_RECORD_FAILED,
  CLEAR_DATA
} from '../constant/ActionTypes';


const initState = {
  loadingAllRecord: 'failed',
  messageError: '',
  data: []
};

const allRecord = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_RECORD:
      return {
        ...state,
        loadingAllRecord: 'loading',
        data: []
      }
    case GET_ALL_RECORD_SUCCESS:
      return {
        ...state,
        loadingAllRecord: 'success',
        data: action.result
      }
    case GET_ALL_RECORD_FAILED:
      return {
        loadingAllRecord: 'failed',
        data: [],
        messageError: action.messageError,
      }
    case CLEAR_DATA:
      return {
        loadingAllRecord: 'success',
        data: [],
        messageError: '',
      }
  default:
    return state
  }
}

export default allRecord;
