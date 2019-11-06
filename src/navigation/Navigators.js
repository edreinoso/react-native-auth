import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { useDispatch } from 'react-redux';

import * as authAction from '../store/actions/auth'
import { FirstScreen, SecondScreen, ThirdScreen, SettingsScreen } from '../screens/index'
import { Button } from '../components/index'
import { dimensions, colors, text, test } from '../styles/index'

// Render tab bar icon
const TabIcon = (iconName, color, iconSize) => {
  return (
    <View>
      <Icon
        name={iconName}
        color={color}
        size={iconSize}
      />
    </View>
  )
}

// Components used for the tab bar
const HomeNavigator = createStackNavigator({
  First: FirstScreen,
}, {
  headerMode: 'none'
});
const SearchNavigator = createStackNavigator({
  Second: SecondScreen,
}, {
  headerMode: 'none'
});
const ProfileNavigator = createStackNavigator({
  Third: ThirdScreen,
}, {
  headerMode: 'none'
});

// Components used for the Drawer
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => TabIcon("ios-home", tintColor, 24)
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => TabIcon("ios-search", tintColor, 24)
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => TabIcon("ios-person", tintColor, 24)
    }
  }
})
const SettingsNavigator = createStackNavigator({
  Settings: SettingsScreen
}, {
  headerMode: 'none'
})

const DrawerNavigator = createDrawerNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      title: 'Home'
    }
  },
  Settings: {
    screen: SettingsNavigator
  }
}, {
  contentOptions: {
    activeTintColor: colors.blue
  },
  contentComponent: props => {
    const dispatch = useDispatch();
    return (
      <View>
        <SafeAreaView>
          <View style={[{
            height: '90%'
          }]}>
            <DrawerNavigatorItems {...props} />
          </View>
          <View style={[{
            height: '10%',
            paddingLeft: 5,
            justifyContent: 'flex-start',
            alignContent: 'flex-start'
          }]}>
            <Button
              fontSize={text.buttonText}
              width={dimensions.width / 3}
              // height={20}
              borderWidth={1}
              padding={10}
              color={colors.white}
              textColor={colors.blue}
              text={'Log out'}
              borderColor={colors.blue}
              borderRadius={5}
              onButtonPress={() =>
                dispatch(authAction.logout())
              }
            />
          </View>
          {/* <Button
            title="Logout"
            color={colors.blue}
            onPress={() => {
              dispatch(authAction.logout());
              // props.navigation.navigate('Auth');
            }}
          /> */}
        </SafeAreaView>
      </View>
    )
  }
})

export default createAppContainer(DrawerNavigator);
