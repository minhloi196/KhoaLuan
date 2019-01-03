import {
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,
} from '../constant/ActionTypes';

export const showErrorModal = (message) => {
  console.log('show error modal')
  return {
    type: SHOW_ERROR_MODAL,
    message
  }
}

export const hideErrorModal = () => {
  console.log('hide error modal')
  return {
    type: HIDE_ERROR_MODAL,
  }
}