/*
LoadMoreButton is a button that is supposed to be used under a ListView. The
user is supposed to click on the button to load more items in the list. For this
purpose LoadMoreButton can be provided with an "onPress" callback.

LoadMoreButton also accepts a "color" prop to determine which color the button
will be (this usually contrasts with the ListView's background color).
*/

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
