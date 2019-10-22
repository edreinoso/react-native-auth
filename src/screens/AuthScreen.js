import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index';
import { Cards, Button, TextField } from '../components/index';
import { LinearGradient } from 'expo-linear-gradient';


class AuthScreen extends Component {
  render() {
    return (
      // this flex is necessary for persistency
      <View style={container.screen}>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={container.gradientContainer}>
          <Cards style={container.authContainer}>
            <ScrollView>
              <Text>Hello World</Text>
            </ScrollView>
          </Cards>
        </LinearGradient>
      </View>
    );
  }
}

export default AuthScreen;
