import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from './AppText'

export default class ItemRow extends Component {
  render () {
    return (
      <View style={styles.item}>
        <AppText>{`${this.props.title} - ${this.props.publish_date}`}</AppText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    height: 50,
    backgroundColor: 'white',
    padding: 3
  }
})

ItemRow.propTypes = {
  title: React.PropTypes.string,
  category: React.PropTypes.string,
  publish_date: React.PropTypes.string
}
