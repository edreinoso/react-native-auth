import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { StartupScreen, AuthScreen } from '../screens/index'
// Exporting navigator from the Tab Navigator
import HomeNavigator from './Navigators'

const ScreenNavigators = createStackNavigator({
  Auth: AuthScreen,
  Startup: StartupScreen,
  Main: HomeNavigator,
}, {
  headerMode: 'none'
})

export default createAppContainer(ScreenNavigators)