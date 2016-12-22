import React, { Component } from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import AppText from '../components/text/AppText'

export default class BasketScene extends Component {
  render () {
    return (
      <View>
        <AppText>Basket</AppText>
        <Icon name='shopping-basket' size={30} color='#900' />
      </View>
    )
  }
}
