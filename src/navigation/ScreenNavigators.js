import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { FourthScreen, FifthScreen, SixthScreen, AuthScreen } from '../screens/index'
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
      gesturesEnabled: false
    }
  },
  Fourth: FourthScreen,
  Fifth: FifthScreen,
  Sixth: SixthScreen,
}, {
  headerMode: 'none'
})

export default createAppContainer(ScreenNavigators)