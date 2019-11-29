import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
import { AUTH, SIGNUP } from './actionTypes';

// this line is giving the yellow warning
import { stopLoading, startLoading } from './ui';

// action should have a mode in order to distinguish which action is being dispatched
export const auth = (email, password, authMode) => {
  console.log('email:', email, 'password:', password, 'authMode:', authMode)

  return async dispatch => {
   dispatch(startLoading())
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmCbVg-Tlhmle8J4XfCVEix3A4f_kRUek'
    // if (authMode === 'login') {
    //   url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmCbVg-Tlhmle8J4XfCVEix3A4f_kRUek'
    // }

    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      dispatch(stopLoading())
      throw new Error('Something went wrong!');
    }
    
    const resData = await response.json();
    console.log(resData);
    dispatch(stopLoading())
    dispatch({ type: SIGNUP });
  };
};
