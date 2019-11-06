import React, { Component } from 'react';
import { useScreens } from 'react-native-screens';
// import Root from './src/redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './src/store/reducers/auth';

import NavigationContainer from './src/navigation/NavigationContainer';

useScreens();

// Reducers should goes inside of ./src/store/index.js file
const rootReducer = combineReducers({
  auth: authReducer
})

// Store should initialization goes inside of ./src/redux.js
// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
      // <Root>
      //   <ScreenNavigators />
      // </Root>
    )
  }
}
