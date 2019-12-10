import React, { Component } from 'react'
import Root from './src/redux'
import ScreenNavigators from './src/navigation/ScreenNavigators'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import { AsyncStorage } from 'react-native'

const MEMORY_KEY_PREFIX = '@MyStorage:'
let dataMemory = {}

class MyStorage {
  static syncPromise = null
  
  static setItem(key, value) {
    AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value)
    dataMemory[key] = value
    return dataMemory[key]
  }
  
  static getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined
  }
  
  static removeItem(key) {
    AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key)
    return delete dataMemory[key]
  }
  
  static clear() {
    dataMemory = {}
    return dataMemory
  }
}

Amplify.configure({
  ...awsconfig,
  storage: MyStorage
})

export default class App extends Component {
  render() {
    return (
      <Root>
        <ScreenNavigators />
      </Root>
    )
  }
}
