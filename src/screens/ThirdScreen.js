import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index'
import { Button, TextField, Header } from '../components/index';

class ThirdScreen extends Component {
  renderHeaderCenter() {
    return (
      <View>
        <Text style={text.headerText}>
          Third Screen
        </Text>
      </View>
    )
  }

  renderHeaderLeft() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.openDrawer()}
      >
        <Icon
          size={23}
          name='ios-menu'
          type='ionicon'
          color={colors.black}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          headerCenter={this.renderHeaderCenter()}
          headerLeft={this.renderHeaderLeft()}
        />
        <View style={container.centerScreen}>
          <Text style={{ fontSize: text.titleText, padding: 5, color: colors.black }}> ThirdScreen </Text>
          <Button
            fontSize={text.buttonText}
            width={dimensions.width / 3}
            // height={20}
            borderWidth={1}
            padding={10}
            color={colors.blue}
            textColor={colors.white}
            borderColor={colors.blue}
            borderRadius={5}
            text='button 1'
            onButtonPress={() => this.props.navigation.navigate('Settings')}
          />
        </View>
      </View>
    );
  }
}

export default ThirdScreen;
