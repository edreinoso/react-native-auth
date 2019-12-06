import React from 'react'
import { StatusBar } from 'react-native'
import Amplify from '@aws-amplify/core'
import { Authenticator } from 'aws-amplify-react-native'
import awsconfig from './aws-exports'

// Base code for amplify

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
})

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    }
  ]
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Authenticator 
        usernameAttributes="email" 
        signUpConfig={signUpConfig}
      />
    </>
  )
}

export default App

// import React, { Component } from 'react';
// import ScreenNavigators from './src/navigation/ScreenNavigators';

// export default class App extends Component {
//   render() {
//     return (
//       <ScreenNavigators />
//     )
//   }
// }
