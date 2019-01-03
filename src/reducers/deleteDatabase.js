import {
  DELETE_DATABASE,
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAILED,
} from '../constant/ActionTypes';

const initState = {
  deleteStatus: 'failed',
  messageError: '',
};

const deleteDB = (state = initState, action) => {
  switch (action.type) {
    case DELETE_DATABASE:
      return {
        ...state,
        deleteStatus: 'loading',
      }
    case DELETE_DATABASE_SUCCESS:
      return {
        ...state,
        deleteStatus: 'success',
      }
    case DELETE_DATABASE_FAILED:
      return {
        deleteStatus: 'failed',
        messageError: action.messageError,
      }
  default:
    return state
  }
}

export default deleteDB;
