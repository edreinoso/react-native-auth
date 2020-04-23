import { AsyncStorage } from 'react-native';
import { AUTH, LOGOUT } from './actionTypes';
import { stopLoading, startLoading } from './ui';

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime)); // this line might not be necessary for now
    dispatch({ type: AUTH, userId: userId, token: token })
  }
}

// action should have a mode in order to distinguish which action is being dispatched
export const auth = (email, password, authMode) => {
  return async dispatch => {
    dispatch(startLoading())
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=$YOUR_KEY'
    if (authMode === 'login') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$YOUR_KEY'
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

    if (!response.ok) {
      if (authMode === 'login') {
        dispatch(stopLoading())
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
      else {
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
    dispatch(authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000
    ));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    // local id comes to be the user ID
    saveDataToStore(resData.idToken, resData.localId, email, expirationDate) //this function will save the token and the expiration time locally for internal application handling
  };
};

const saveDataToStore = (tokenId, userId, email, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: tokenId,
      userId: userId,
      email: email,
      expirationDate: expirationDate.toISOString()
    })
  )
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

export const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}