// this might actually not be necessary either
// import { AsyncStorage } from 'react-native';

import { Auth } from 'aws-amplify'
import { AUTH, LOGOUT } from './actionTypes';
import { stopLoading, startLoading } from './ui';

export const auth = (username, password, authMode) => {
  console.log(username, password, authMode)

  return async dispatch => {
    // dispatch(startLoading())
    if (authMode === 'signUp') {
      const response = await Auth.signUp({
        username,
        password,
      })
      // block of code below is not going to be used momentiraly
      // .then(data => console.log(data))
      // .catch(err => {
      //   console.log(err)
      // })
    } else {
      const response = await Auth.signIn({
        username, // Required, the username
        password, // Optional, the password
      })
      // .then(user => {
      //   console.log(user)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    }

    if (!response.ok) {
      // dispatch(stopLoading())
      const errorResData = await response.json();
      const errorId = errorResData.err.code;
      let message = 'Something went wrong!';
      if (errorId === 'NotAuthorizedException') {
        message = 'User not authorized!';
      } else if (errorId === 'UserNotFoundException') {
        message = 'User not found!';
      } else if (errorId === 'PasswordResetRequiredException') {
        message = 'Existing user found. Please reset your password'
      } else if (errorId === 'UserNotConfirmedException') {
        message = 'Account not verified yet'
      }
      throw new Error(message);
    }

    const resData = await response.json(); //need to check whether the response is going to be used.
    console.log(resData);
    // dispatch(stopLoading())
  };
};
