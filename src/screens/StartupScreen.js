import React, { useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { container, colors } from '../styles/index';

import * as authActions from '../store/actions/auth';

// class StartupScreen extends Component {
const StartupScreen = props => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const tryLogin = async() => {
      // im getting this from the state, which eventually gets
      // its data from the reducer
      const userData = await AsyncStorage.getItem('userData')

      // if user data is not valid
      if (!userData) {
        props.navigation.navigate('Auth')
        return;
      }

      const transformedData = JSON.parse(userData)
      const { token, userId, expiryDate } = transformedData
      // to have the expiration date in date format
      const expirationDate = new Date(expiryDate)

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth')
        return;
      }

      props.navigation.navigate('First')
      dispatch(authActions.authenticate(userId, token))
    }

    tryLogin()
  }, [dispatch])

  return (
    <View styles={container.centerScreen}>
      <ActivityIndicator size="large" color={colors.black}/>
    </View>
  )
}

export default StartupScreen;
