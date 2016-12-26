import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from './AppText'
import { colors } from '../style'

export default class TabIcon extends Component {
  render () {
    return (
      <View style={styles.tabContainer}>
        <Icon
          name={this.props.iconName}
          size={30}
          color={this.props.selected ? colors.primary : colors.inactive}
        />
        <AppText style={StyleSheet.flatten({
          color: this.props.selected ? colors.primary : colors.inactive,
          fontSize: 12
        })}>
          {this.props.title}
        </AppText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

TabIcon.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string
}
