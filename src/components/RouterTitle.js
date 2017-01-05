import React, { Component } from 'react'
import { StyleSheet, View, Platform } from 'react-native'

import AppText from './AppText'

const itemScenes = [
  'postsItemScene',
  'listItemScene',
  'searchItemScene'
]

export default class RouterTitle extends Component {
  render () {
    if (itemScenes.includes(this.props.scene.name)) {
      return (
        <View style={styles.titleWrapper}>
          <AppText style={StyleSheet.flatten(styles.titleText)}>
            {this.props.scene.item.title}
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
    //The presentation of the title depend of the os. 
    paddingTop: (Platform.OS === 'ios') ? 26 : 13 
  },
  titleText: {
    fontSize: 20
  }
})

RouterTitle.propTypes = {
  scene: React.PropTypes.object
}
