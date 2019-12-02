import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { AuthScreen } from '../screens/index'
// Exporting navigator from the Tab Navigator
import HomeNavigator from './Navigators'

const ScreenNavigators = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Main: {
    screen: HomeNavigator,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
}, {
  headerMode: 'none'
})

export default createAppContainer(ScreenNavigators)