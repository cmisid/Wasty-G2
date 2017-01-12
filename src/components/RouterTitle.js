import React, { Component } from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'

import AppText from './AppText'

const mainScenes = [
  'postsViewScene',
  'likesViewScene',
  'searchViewScene',
  'mapScene',
  'accountViewScene'
]

const itemScenes = [
  'postsItemScene',
  'likesItemScene',
  'searchItemScene',
  'accountItemScene'
]

const userScenes = [
  'postsUserScene',
  'likesUserScene',
  'searchUserScene'
]

export default class RouterTitle extends Component {
  render () {
    if (mainScenes.includes(this.props.scene.name)) {
      return (
        // The paddingTop is different for the logo than for the text
        <View style={{alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 30 : 10}}>
          <Image
            source={require('../assets/img/logo.png')}
            style={{height: Platform.OS === 'ios' ? 22 : 37, width: 70, marginBottom: 3}}
          />
        </View>
      )
    } else if (itemScenes.includes(this.props.scene.name)) {
      return (
        <View style={styles.titleWrapper}>
          <AppText style={StyleSheet.flatten(styles.titleText)}>
            {this.props.scene.item.title}
          </AppText>
        </View>
      )
    } else if (userScenes.includes(this.props.scene.name)) {
      return (
        <View style={styles.titleWrapper}>
          <AppText style={StyleSheet.flatten(styles.titleText)}>
            {this.props.scene.user.fullName}
          </AppText>
        </View>
      )
    } else {
      return (
        <View style={styles.titleWrapper}>
          <AppText style={StyleSheet.flatten(styles.titleText)}>
            {this.props.scene.title}
          </AppText>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
    // The presentation of the title depends on the os
    paddingTop: (Platform.OS === 'ios') ? 26 : 13
  },
  titleText: {
    fontSize: 20
  }
})

RouterTitle.propTypes = {
  scene: React.PropTypes.object
}
