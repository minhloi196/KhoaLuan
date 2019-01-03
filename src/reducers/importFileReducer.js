import {
  IMPORT_FILE,
  IMPORT_FILE_SUCCESS,
  IMPORT_FILE_FAILED,
  CLEAR_DATA_MODAL_IMPORT
} from '../constant/ActionTypes';

const initState = {
  importFile: 'success',
  messageError: ''
};

const importFile = (state = initState, action) => {
  switch (action.type) {
    case IMPORT_FILE:
      return {
        importFile: 'loading',
        messageError: ''
      }
    case IMPORT_FILE_SUCCESS:
      return {
        importFile: 'success',
        messageError: ''
      }
    case IMPORT_FILE_FAILED:
      return {
        importFile: 'failed',
        messageError: action.messageError.toString()
      }
    case CLEAR_DATA_MODAL_IMPORT:
      return {
        importFile: 'success',
        messageError: ''
      }
  default:
    return state
  }
}

export default importFile;