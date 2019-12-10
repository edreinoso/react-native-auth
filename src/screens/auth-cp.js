import React, { Component } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { container, text, colors } from '../styles/index'
import { Button, TextField, Cards } from '../components/index'
// import { connect } from 'react-redux'
import validity from '../utility/validate'
// import { auth } from '../store/actions/index'
// this might not be necessary if actions are set
import { Auth } from 'aws-amplify'

class AuthScreen extends Component {
  state = {
    authMode: 'signUp',
    confirmPass: false
  }

  componentWillMount() {
    this.reset()
  }

  reset = () => {
    this.setState({
      controls: {
        email: {
          value: '',
          validity: true,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          validity: true,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmCode: {
          value: '',
          validity: true,
          validationRules: {
            minLength: 6
          },
          touched: false
        }
      },
    })
  }

  onFinishTextField = (key, value) => {
    // variable value doesn't hold a text variable
    let text = value.nativeEvent.text
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            validity: validity(text, prevState.controls[key].validationRules),
          }
        }
      }
    })
  }

  onChangeTextField = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            touched: true
          }
        }
      }
    })
  }

  errorMessage = (err) => {
    if (err.code === 'UserNotConfirmedException') {
      Alert.alert('Account not verified yet', err.code, [{ text: 'Okay' }]);
    } else if (err.code === 'PasswordResetRequiredException') {
      Alert.alert('Existing user found. Please reset your password', err.code, [{ text: 'Okay' }]);
    } else if (err.code === 'NotAuthorizedException') {
      Alert.alert('Not authorized', err.code, [{ text: 'Okay' }]);
    } else if (err.code === 'UserNotFoundException') {
      Alert.alert('User does not exist!', err.code, [{ text: 'Okay' }]);
    } else {
      Alert.alert(err.code);
    }
  }

  onLoginAndSubmitPressed = () => {
    console.log(this.state.controls.email.valid,this.state.controls.password.valid)

    if (!this.state.controls.email.touched || !this.state.controls.password.touched) {
      Alert.alert('Please input values in fields')
    } else if (!this.state.controls.email.validity || !this.state.controls.password.validity) {
      Alert.alert('Please enter valid inputs')
    } else {
      let username = this.state.controls.email.value
      let password = this.state.controls.password.value
      console.log(this.state.authMode)
      // Sign Up!
      if (this.state.authMode === 'signUp') {
        // Once this variable changes, then there's another field that needs to be added.
        this.setState({
          confirmPass: true
        })
        Auth.signUp({
          username,
          password,
        })
          .then(data => console.log(data))
          .catch(err => {
            console.log(err)
            this.errorMessage(err)
          })
      } else {
        // Sign In!
        Auth.signIn({
          username, // Required, the username
          password, // Optional, the password
        })
          .then(user => {
            console.log(user)
            this.props.navigation.navigate('First') // if it was successful, then go to next screen
          })
          .catch(err => {
            console.log(err)
            this.errorMessage(err)
          })
        this.reset()
      }
    }
  }

  onConfirmSignUpPressed = () => {
    // this might have to change to global variable since it's being used above as well
    let username = this.state.controls.email.value
    let code = this.state.controls.confirmCode.value

    Auth.confirmSignUp(username, code, {
      forceAliasCreation: true
    }).then(data => console.log(data))
      .catch(err => console.log(err))
    // navigating after confirming the code
    this.props.navigation.navigate('First')
    this.reset()
  }

  onSwitchHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "signUp" ? "login" : "signUp"
      }
    })
  }

  render() {
    return (
      // this flex is necessary for persistency
      <View style={container.screen}>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={container.centerScreen}>
          <Cards style={container.authContainer}>
            <ScrollView>
              <Text>Auth with Amplify</Text>
              <TextField
                onChangeInput={val => this.onChangeTextField('email', val)}
                onFinishInput={val => this.onFinishTextField('email', val)}
                value={this.state.controls.email.value}
                valid={this.state.controls.email.validity}
                touched={this.state.controls.email.touched}
                errorText='Please enter a valid email'
                keyboardType='email-address'
                autoCapitalize='none'
                //Styles
                title={'Email'}
                color={colors.black}
                borderColor={colors.black}
                borderWidth={1}
              />
              <TextField
                onChangeInput={val => this.onChangeTextField('password', val)}
                onFinishInput={val => this.onFinishTextField('password', val)}
                value={this.state.controls.password.value}
                valid={this.state.controls.password.validity}
                touched={this.state.controls.password.touched}
                keyboardType='default'
                errorText='Please enter a valid password'
                secureTextEntry
                // Styles
                title={'Password'}
                color={colors.black}
                borderColor={colors.black}
                borderWidth={1}
              />
              {this.state.confirmPass ? (
                <TextField
                  onChangeInput={val => this.onChangeTextField('confirmCode', val)}
                  onFinishInput={val => this.onFinishTextField('password', val)}
                  value={this.state.controls.confirmCode.value}
                  valid={this.state.controls.password.validity}
                  touched={this.state.controls.password.touched}
                  keyboardType='default'
                  errorText='Please enter a 6 digit code'
                  // Styles
                  title={'Confirm Code'}
                  color={colors.black}
                  borderColor={colors.black}
                  borderWidth={1}
                />
              ) : null}
              <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                {this.state.confirmPass ? (
                  <Button
                    fontSize={text.buttonText}
                    borderWidth={1}
                    padding={10}
                    color={colors.white}
                    textColor={colors.blue}
                    borderColor={colors.white}
                    borderRadius={5}
                    text='Confirm Sign Up'
                    onButtonPress={this.onConfirmSignUpPressed}
                  />
                ) : (
                    <View>
                      <Button
                        fontSize={text.buttonText}
                        borderWidth={1}
                        padding={10}
                        color={colors.white}
                        textColor={colors.red}
                        borderColor={colors.white}
                        borderRadius={5}
                        text={this.state.authMode === 'signUp' ? 'Sign Up' : 'Login'}
                        onButtonPress={this.onLoginAndSubmitPressed}
                      />
                      <Button
                        fontSize={text.buttonText}
                        borderWidth={1}
                        padding={10}
                        color={colors.white}
                        textColor={colors.blue}
                        borderColor={colors.white}
                        borderRadius={5}
                        text={`Switch to ${this.state.authMode === 'signUp' ? 'Login' : 'Sign Up'}`}
                        onButtonPress={() => this.onSwitchHandler()}
                      />
                    </View>
                  )}
              </View>
            </ScrollView>
          </Cards>
        </LinearGradient>
      </View>
    )
  }
}

export default AuthScreen

// const mapStateToProps = state => {
//   return {
//     isLoading: state.ui.isLoading
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     auth: (email, password, authMode) => dispatch(auth(email, password, authMode))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
