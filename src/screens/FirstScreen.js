import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index'
import { Button, Header } from '../components/index';

class FirstScreen extends Component {
  state = {
    email: ''
  }
  
  renderHeaderCenter() {
    return (
      <View>
        <Text style={text.headerText}>
          First Screen
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

  componentWillMount = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      const item = JSON.parse(value);
      if (value !== null) {
        // We have data!!
        this.setState({
          email: item.email
        })
      } else {
        console.log('value: null')
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    const { userEmail } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          headerCenter={this.renderHeaderCenter()}
          headerLeft={this.renderHeaderLeft()}
        />
        <View style={container.centerScreen}>
          <Text style={{ fontSize: text.titleText, padding: 5, color: colors.black }}> FirstScreen </Text>
          {/* <Text style={{ fontSize: text.normalText }}>AsyncStore.getItem().userData.email</Text> */}
          <Text style={{ fontSize: text.normalText }}>{this.state.email}</Text>
          <View style={{ margin: 5 }} />
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
            // onButtonPress={() => this.props.navigation.navigate('Settings')}
            onButtonPress={() => this._retrieveData()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // return information from current user
}

// export default connect(mapStateToProps, {})(FirstScreen);
export default FirstScreen;
