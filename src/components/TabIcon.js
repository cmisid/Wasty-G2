import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import AppText from './AppText'
import { colors } from '../style'

export default class TabIcon extends Component {
  render () {
    return (
      <AppText style={StyleSheet.flatten({
        color: this.props.selected ? colors.primary : colors.inactive,
        fontSize: 12
      })}>
        {this.props.title}
      </AppText>
    )
  }
}

TabIcon.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string
}
