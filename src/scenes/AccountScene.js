import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { colors } from '../style'

export default class AccountScene extends Component {
  render () {
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <Icon.Button name='id-card' backgroundColor={colors.primary} onPress={this.loginWithFacebook}>
            Modifier mes informations
          </Icon.Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'space-between',
    width: 300
  }
})
