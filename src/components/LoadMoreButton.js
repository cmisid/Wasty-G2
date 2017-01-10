import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '../style'

export default class LoadMoreButton extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.props.onPress()} style={styles.button} activeOpacity={0}>
          <Icon color={this.props.iconColor} name='add-circle' size={40} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.transparent
  },
  wrapper: {
    alignSelf: 'center',
    height: 45
  }
})

LoadMoreButton.propTypes = {
  iconColor: React.PropTypes.string,
  onPress: React.PropTypes.func
}
