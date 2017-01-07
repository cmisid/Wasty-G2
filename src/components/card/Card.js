import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class Card extends Component {
  render () {
    const newStyles = this.props.styles || {}
    return (
      <View style={[styles.container, styles.card, newStyles.card]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    marginLeft: 5,
    marginRight: 5
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  }
})
