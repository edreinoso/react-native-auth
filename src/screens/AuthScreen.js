import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { container, text, colors } from '../styles/index'
import { Button, TextField, Cards } from '../components/index'
import { Auth } from 'aws-amplify'

class AuthScreen extends Component {
  state = {
    authMode: 'signUp',
  }

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      controls: {
        email: {
          value: '',

          // Validation will not be enabled just yet
          // validity: true,
          // validationRules: {
          //   isEmail: true
          // },
          // touched: false
        },
        password: {
          value: '',

          // Validation will not be enabled just yet
          // validity: true,
          // validationRules: {
          //   minLength: 6 // doubt
          // },
          // touched: false
        }
      },
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
            // validity: validity(value, prevState.controls[key].validationRules),
            touched: true
          }
        }
      }
    })
  }

  // Sign Up first
  onButtonPressed = () => {
    let username = this.state.controls.email.value
    let password = this.state.controls.password.value
    
    console.log('testing inside of button pressed- username:', username, 'password:', password)

    Auth.signUp({
      username,
      password,
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  // changing from login to signup
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
                // onFinishInput={val => this.onFinishTextField('email', val)}
                value={this.state.controls.email.value}
                // valid={this.state.controls.email.validity}
                // touched={this.state.controls.email.touched}
                // errorText='Please enter a valid email'
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
                // onFinishInput={val => this.onFinishTextField('password', val)}
                value={this.state.controls.password.value}
                // valid={this.state.controls.password.validity}
                // touched={this.state.controls.password.touched}
                keyboardType='default'
                errorText='Please enter a valid password'
                secureTextEntry
                // Styles
                title={'Password'}
                color={colors.black}
                borderColor={colors.black}
                borderWidth={1}
              />
              <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                <Button
                  fontSize={text.buttonText}
                  // width={dimensions.width / 3}
                  // height={20}
                  borderWidth={1}
                  padding={10}
                  color={colors.white}
                  textColor={colors.red}
                  borderColor={colors.white}
                  borderRadius={5}
                  text={this.state.authMode === 'signUp' ? 'Sign Up' : 'Login'}
                  onButtonPress={this.onButtonPressed}
                />
                <Button
                  fontSize={text.buttonText}
                  // width={dimensions.width / 3}
                  // height={20}
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
            </ScrollView>
          </Cards>
        </LinearGradient>
      </View>
    )
  }
}

// export default withAuthenticator(AuthScreen, true)
export default AuthScreen
