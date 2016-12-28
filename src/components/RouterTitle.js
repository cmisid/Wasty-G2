import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default class RouterTitle extends Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <View style={styles.titleWrapper}>
        <Image source={require('../img/logo.png')} style={styles.titleImage} />
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
