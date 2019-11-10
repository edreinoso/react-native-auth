import React, { Component } from 'react';
import Root from './src/redux';
import ScreenNavigators from './src/navigation/ScreenNavigators';

export default class App extends Component {
  render() {
    return (
      <Root>
        <ScreenNavigators />
      </Root>
    )
  }
}
