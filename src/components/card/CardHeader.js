import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import AppText from '../AppText'

export default class CardHeader extends Component {
  render () {
    return (
      <View style={styles.header}>
        <AppText style={StyleSheet.flatten(styles.title)}>{`${this.props.title} - ${this.props.category}`}</AppText>
      </View>
    )
  }
}

CardHeader.propTypes = {
  title: React.PropTypes.string,
  category: React.PropTypes.string
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5
  }
})
