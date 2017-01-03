import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from './AppText'
import ProgressiveImage from './ProgressiveImage'

export default class UserView extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.user.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.user.imgUrl }}
            style={styles.image}
          />
          <AppText>{this.props.user.fullName}</AppText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  wrapper: {
    padding: 20,
    flex: 1
  }
})

UserView.propTypes = {
  user: React.PropTypes.object
}
