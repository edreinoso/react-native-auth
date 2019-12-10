// this might actually not be necessary either
// import { AsyncStorage } from 'react-native';

import { Auth } from 'aws-amplify'
import { AUTH, LOGOUT } from './actionTypes';
import { stopLoading, startLoading } from './ui';

export const confirmCodeSignUp = (username, code) => {
  console.log(username, code)
  return async dispatch => {
    const response = await Auth.confirmSignUp(username, code, {
      forceAliasCreation: true
    })
    console.log('confirm code response:',response)
  }
}

export const auth = (username, password, authMode) => {
  console.log(username, password, authMode)
  return async dispatch => {
    // dispatch(startLoading())
    if (authMode === 'signUp') {
      const response = await Auth.signUp({
        username,
        password,
      })
      console.log('sign in response:',response)
    } else {
      const response = await Auth.signIn({
        username,
        password,
      })
      console.log('login response:',response)
    }
    // dispatch(stopLoading())
  };
};
