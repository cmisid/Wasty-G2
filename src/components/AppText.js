/*
AppText is a thin wrapper around React Native's Text component and is meant to
act in the same way.

This is the canonical way to set a global font all around the application.

See https://facebook.github.io/react-native/docs/text.html#limited-style-inheritance
for more information.
*/

import React, { Component } from 'react'
import { Text } from 'react-native'

import { textStyle } from '../style'

export default class AppText extends Component {
  render () {
    return (
      <Text style={[textStyle, this.props.style || {}]} onPress={() => { if (this.props.onPress) this.props.onPress() }}>
        {this.props.children}
      </Text>
    )
  }
}

AppText.propTypes = {
  children: React.PropTypes.node,
  onPress: React.PropTypes.func,
  style: React.PropTypes.object
}
