export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
  
  // this is returning an empty string
  console.log('email-2:', email,'password-2:',password)
  
  
  return async dispatch => {
    //AIzaSyDmCbVg-Tlhmle8J4XfCVEix3A4f_kRUek
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmCbVg-Tlhmle8J4XfCVEix3A4f_kRUek',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};