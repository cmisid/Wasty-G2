/*
Overlay is a splashscreen-like component that is displayed at full width and
height in front of the application.

Typical use-cases are:

- The user is not connected to the internet.
- The user is not logged in.
- The server is not responding.

In each of these cases the application can't function, hence the need for an
overlay to tell the user why.
*/

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import AppText from './AppText'
import { colors } from '../style'

export default class Overlay extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Icon name={this.props.iconLabel} size={100} color={colors.secondary} />
        <View style={{height: 30}} />
        <AppText style={StyleSheet.flatten(styles.message)}>
          {this.props.message}
        </AppText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  message: {
    color: colors.secondary,
    fontSize: 30,
    alignSelf: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  }
})

Overlay.propTypes = {
  iconLabel: React.PropTypes.string,
  message: React.PropTypes.string
}
