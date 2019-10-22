import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, cards } from '../styles/index'

// const Cards = props => {
//   const {
//     style,
//     children
//   } = props;
//   return <View style={[cards.cardContainer, style]}>{children}</View>;
// };

class Cards extends Component {
  render() {
    const {
      style,
      children
    } = this.props
    
    return (
      <View style={[cards.cardContainer, style]}>
        { children }
      </View>
    );
  }
}

export default Cards;
