import { Auth } from 'aws-amplify'
import { LOGOUT } from './actionTypes'

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
    console.log('hello world')
    if (authMode === 'signUp') {
      const response = await Auth.signUp({
        username,
        password,
      })
      console.log('sign up response:',response)
    } else if (authMode === 'login') {
      const response = await Auth.signIn({
        username,
        password,
      })
      console.log('login response:',response)
    }
  }
}


export const logout = () => {
  // this is returning undefined, yet when trying to get the current user from the auth screen
  // there is a return as no user authenticated. For now skip this error, if it comes back later
  // take a look at it
  Auth.signOut  ({ global: true })
    // data will be undefined
    .then(data => console.log(data))
    .catch(err => console.log(err))
  return { type: LOGOUT }
}