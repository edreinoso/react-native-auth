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
    if (authMode === 'login') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmCbVg-Tlhmle8J4XfCVEix3A4f_kRUek'
    }

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

    if (authMode === 'login') {
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }
    } else {
      if (!response.ok) {
        dispatch(stopLoading())
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }
        throw new Error(message);
      }
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(stopLoading())
    dispatch({ type: SIGNUP });
  };
};
