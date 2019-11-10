import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
  return dispatch => {
    // dispatch(uiStartLoading())
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmCbVg-Tlhmle8J4XfCVEix3A4f_kRUek'
    fetch(
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
      .catch(err => {
        console.log(err);
        alert("Authentication failed, please try again!");
        // dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        // dispatch(uiStopLoading());
        if (parsedRes.error) {
          alert("Authentication failed, please try again!");
        } else {
          startMainTabs();
        }
      });

  };
};
