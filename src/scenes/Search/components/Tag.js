import React, { Component } from 'react'
import { TouchableHighlight, View } from 'react-native'

import AppText from '../../../components/AppText'

export default class Tag extends Component {
  render () {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
      {/*a tag CLIKABLE TO DELETE IT*/}
        <View style={this.props.style}>
          <AppText>
            {this.props.text}
          </AppText>
        </View>
      </TouchableHighlight>
    )
  }
}

AppText.propTypes = {
  style: React.PropTypes.object,
  text: React.PropTypes.string
}
