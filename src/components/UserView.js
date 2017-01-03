import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from './AppText'

export default class UserView extends Component {
  render () {
    return (
      <View style={styles.titleWrapper}>
        <AppText>{this.props.user.fullName}</AppText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleImage: {
    height: 30,
    width: 80
  },
  titleWrapper: {
    alignItems: 'center',
    paddingTop: 24
  }
})

UserView.propTypes = {
  user: React.PropTypes.object
}
