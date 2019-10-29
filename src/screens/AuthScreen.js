import React, { useReducer, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { container, colors, text, dimensions } from '../styles/index';
import { Cards, Button, TextField } from '../components/index';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    // what is this expression?
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
}

const AuthScreen = props => {
  // this can be put into a different file
  const dispatch = useDispatch();

  // why joining two values in an object
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false
  })

  const signUpHandler = () => {
    console.log('getting to the signUpHandler')

    // testing values
    console.log('email-1:', formState.inputValues.email,'password-2:',formState.inputValues.password)

    dispatch(
      authActions.signup(
        'hello',
        'world'
        // formState.inputValues.email,
        // formState.inputValues.password
      )
    )
  }

  // why is usecallback here?
  const onChangeTextHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

  return (
    // this flex is necessary for persistency
    <View style={container.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={container.gradientContainer}>
        <Cards style={container.authContainer}>
          <ScrollView>
            <TextField
              title={'Email'}
              color={colors.black}
              borderColor={colors.black}
              borderWidth={1}
              onChangeInput={onChangeTextHandler}
              initialValue=''
              errorText='Please enter valid email'
              required
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <TextField
              title={'Password'}
              color={colors.black}
              borderColor={colors.black}
              borderWidth={1}
              minLength={5}
              onChangeInput={onChangeTextHandler}
              initialValue=''
              errorText='Please enter valid password'
              keyboardType='default'
              required
              secureTextEntry
            />
            <View style={{ alignItems: 'center', paddingVertical: 5 }}>
              {/* This needs to be changed to sign up */}
              <Button
                fontSize={text.buttonText}
                width={dimensions.width / 3}
                // height={20}
                borderWidth={1}
                padding={10}
                color={colors.white}
                textColor={colors.blue}
                borderColor={colors.white}
                borderRadius={5}
                text='Login'
                onButtonPress={signUpHandler}
              />
              <Button
                fontSize={text.buttonText}
                width={dimensions.width / 3}
                // height={20}
                borderWidth={1}
                padding={10}
                color={colors.white}
                textColor={colors.red}
                borderColor={colors.white}
                borderRadius={5}
                text='Sign Up'
              // onButtonPress={() => this.props.navigation.navigate('Fourth')}
              />
            </View>
          </ScrollView>
        </Cards>
      </LinearGradient>
    </View>
  );
}

export default AuthScreen;
