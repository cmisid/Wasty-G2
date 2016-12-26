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
