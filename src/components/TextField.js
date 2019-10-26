import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/index';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      }
    default:
      return state;
  }
}

const TextField = props => { // hook problems when having classes
  const {
    title,
    placeholder,
    borderColor,
    borderWidth,
    initialValue,
    initiallyValid,
    email,
    errorText,
    onChangeInput, // this is onInputChange
    id,
    autoCorrect,
    autoCapitalize,
    color,
    minLength,
    secureTextEntry,
    keyboardType,
    required, //this value represent required fields
    placeholderTextColor,
    borderRadius,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid, // where is this coming from
    touched: false
  });

  useEffect(() => {
    if (inputState.touched) {
      onChangeInput(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onChangeInput, id])

  // variable text would be obteined from getting the onChangeText down below
  const textChangeHandler = text => {
    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    // manual validation tests
    if (required && text.trim().length === 0) {
      isValid = false;
    } if (email && !emailCheck.test(text.toLowerCase())) {
      isValid = false;
    } if (minLength != null && text.length < minLength) {
      isValid = false;
    } if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid
    });
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <View style={styles.formControler}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        placeholder={placeholder ? placeholder : ""}
        value={inputState.value}
        onChangeText={textChangeHandler}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        onBlur={lostFocusHandler}
        style={[styles.inputPadding, {
          color: color,
          borderBottomColor: borderColor,
          borderBottomWidth: borderWidth,
        }]}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View> //it is not <View/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    marginHorizontal: 5
  },
  inputPadding: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bottomPadding: {
    paddingBottom: 2,
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: colors.red,
    fontSize: 13
  }
});

export default TextField;
