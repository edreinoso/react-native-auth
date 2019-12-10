import React, { Component } from 'react'
import Root from './src/redux';
import ScreenNavigators from './src/navigation/ScreenNavigators'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

export default class App extends Component {
  render () {
    return (
      <Root>
        <ScreenNavigators />
      </Root>
    )
  }
}
