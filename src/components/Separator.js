import React, { Component } from 'react'
import { View } from 'react-native'

export default class Separator extends Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <View style={{height: 7}} />
    )
  }
}
