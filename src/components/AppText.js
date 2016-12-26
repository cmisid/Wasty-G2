import React, { Component } from 'react'
import { Text } from 'react-native'

import { textStyle } from '../style'

export default class AppText extends Component {
  render () {
    return (
      <Text style={[textStyle, this.props.style || {}]}>
        {this.props.children}
      </Text>
    )
  }
}

AppText.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
}
