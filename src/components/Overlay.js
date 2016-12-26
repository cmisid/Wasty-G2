import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import AppText from './AppText'
import { colors } from '../style'

export default class Overlay extends Component {
  render () {
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <Icon name={this.props.iconLabel} size={100} color={colors.secondary} />
          <AppText>
            <Text style={styles.containerMessage}>
              {this.props.message}
            </Text>
          </AppText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerMessage: {
    color: colors.secondary,
    fontSize: 30
  },
  containerWrapper: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'space-between',
    width: 200
  }
})

Overlay.propTypes = {
  iconLabel: React.PropTypes.string,
  message: React.PropTypes.string
}
