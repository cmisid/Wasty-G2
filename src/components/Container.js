/*
Container is simply a View with top and bottom margins to counteract
react-native-router-flux's tab bar implementation which messes with the UI
layout.

For the while each scene in the app should begin with a Container so as to unify
the layout accross the app.
*/

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class Container extends Component {
  render () {
    return (
      <View style={[styles.container, this.props.style || {}]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 62,
    marginBottom: 50
  }
})

Container.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
}
