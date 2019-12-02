import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { container, colors, text } from '../styles/index';
import { Cards, Button, TextField } from '../components/index';
// import { Cards, TextField } from '../components/index';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../store/actions/index'
import { connect } from "react-redux";
import validity from '../utility/validate';
import authReducer from '../store/actions/auth';

// const AuthScreen = props => {
class AuthScreen extends Component {
  // State needs to go outside of the render
  state = {
    authMode: 'signUp',
    isSignUp: false,
    finished: false,
  }

  componentWillMount() {
    this.reset();
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
            minLength: 6 // doubt
          },
          touched: false
        }
      },
    })
  }

  // Update text field
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

  // State change - dispatch actions
  onButtonPressed = async () => {
    console.log(this.state.authMode)
    console.log('email:', this.state.controls.email.value, 'password:', this.state.controls.password.value)
    try {
      console.log('have made it to the beginning of the try')
      await this.props.auth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.authMode
      )
      this.props.navigation.navigate('First')
      this.reset();
    } catch (err) {
      Alert.alert('An Error Ocurred', err.message, [{ text: 'Okay' }]);
      this.reset();
    }
  }

  // changing from login to signup
  onSwitchHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "signUp" ? "login" : "signUp"
      };
    });
  };

  render() {
    const { isLoading } = this.props;
    return (
      // this flex is necessary for persistency
      <View style={container.screen}>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={container.centerScreen}>
          <Cards style={container.authContainer}>
            <ScrollView>
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
              <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                {isLoading ?
                  <ActivityIndicator size="small" color={colors.black} /> :
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
                }
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
    );
  }
}

const mapStateToProps = state => {
  // needs to return an object rather than a simple true/false variable
  return {
    isLoading: state.ui.isLoading
  };
  // return state.ui.isLoading;
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, authMode) => dispatch(auth(email, password, authMode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
// export default AuthScreen;