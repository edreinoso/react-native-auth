import React, { Component } from 'react'
import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { container, text, colors } from '../styles/index'
import { Button, TextField, Cards } from '../components/index'
import { connect } from 'react-redux'
import validity from '../utility/validate'
import { auth, confirmCodeSignUp, stopLoading, startLoading } from '../store/actions/index'
// import { Auth } from 'aws-amplify'

class AuthScreen extends Component {
  state = {
    authMode: 'signUp',
    confirmPass: false
  }

  componentWillMount() {
    // console.log('Hello World')
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

  onLoginAndSubmitPressed = async () => {
    // error handling
    if (!this.state.controls.email.validity || !this.state.controls.password.validity) {
      Alert.alert('Please enter valid inputs')
    } else {
      if (this.state.authMode === 'signUp') {
        this.setState({
          confirmPass: true
        })
      }
      
      this.props.startLoading()
      try {
        await this.props.auth(
          this.state.controls.email.value,
          this.state.controls.password.value,
          this.state.authMode
        )
        if (this.state.authMode === 'login') {
          // what to do with these two values? 
          this.props.stopLoading()
          this.props.navigation.navigate('First')
          this.reset()
        }
        this.props.stopLoading()
      } catch (err) {
        this.props.stopLoading()
        Alert.alert('An Error Ocurred', err.message, [{ text: 'Okay'}])
      }
    }
  }

  onConfirmSignUpPressed = async () => {
    try {
      this.props.startLoading()
      await this.props.confirmCodeStep(
        this.state.controls.email.value,
        this.state.controls.confirmCode.value
      )
      this.props.stopLoading()
      this.props.navigation.navigate('First')
      this.reset()
    } catch (err) {
      this.props.stopLoading()
      Alert.alert('An Error Ocurrerd', err.message, [{ text: 'Okay' }])
    }
  }

  onSwitchHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "signUp" ? "login" : "signUp"
      }
    })
  }

  // onTestButtonPressed = () => {
  //   Auth.currentAuthenticatedUser({
  //     bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  //   }).then(user => console.log(user))
  //     .catch(err => console.log(err));
  // }

  render() {
    const { isLoading } = this.props;
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
                {this.state.confirmPass ? 
                  isLoading ? <ActivityIndicator size="small" color={colors.black} /> : <Button fontSize={text.buttonText} borderWidth={1} padding={10} color={colors.white} textColor={colors.blue} borderColor={colors.white} borderRadius={5} text='Confirm Sign Up' onButtonPress={this.onConfirmSignUpPressed} /> : 
                  isLoading ? <ActivityIndicator size="small" color={colors.black} /> : <View><Button fontSize={text.buttonText} borderWidth={1} padding={10} color={colors.white} textColor={colors.red} borderColor={colors.white} borderRadius={5} text={this.state.authMode === 'signUp' ? 'Sign Up' : 'Login'} onButtonPress={this.onLoginAndSubmitPressed} /><Button fontSize={text.buttonText} borderWidth={1} padding={10} color={colors.white} textColor={colors.blue} borderColor={colors.white} borderRadius={5} text={`Switch to ${this.state.authMode === 'signUp' ? 'Login' : 'Sign Up'}`} onButtonPress={() => this.onSwitchHandler()} /></View> }
                {/* <Button
                  fontSize={text.buttonText} 
                  borderWidth={1} 
                  padding={10} 
                  color={colors.white} 
                  textColor={colors.green} 
                  borderColor={colors.white} 
                  borderRadius={5} 
                  text='Test user' 
                  onButtonPress={this.onTestButtonPressed}
                /> */}
              </View>
            </ScrollView>
          </Cards>
        </LinearGradient>
      </View>
    )
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, authMode) => dispatch(auth(email, password, authMode)),
    confirmCodeStep: (email, confirmCode) => dispatch(confirmCodeSignUp(email, confirmCode)),
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);