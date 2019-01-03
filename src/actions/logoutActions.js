// import axios from 'axios';

// import { SERVER_HOST } from '../setting';
// import { LOGIN_API } from '../constant/Apis';
import {
  LOGOUT
} from '../constant/ActionTypes';

export const requestLogout = () => {

  console.log('---------- request logout-------------')

  // return({
  //   type: LOGOUT,
  // })

  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  }

}
