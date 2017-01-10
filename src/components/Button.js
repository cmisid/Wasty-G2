import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import { colors } from '../style'
import AppText from './AppText'

export default class Button extends Component {

  render () {
    return (
      <TouchableHighlight style={styles.submitButton} onPress={() => this.props.onPress()} underlayColor={colors.primary}>
        <View>
          <AppText style={StyleSheet.flatten(styles.submitButtonText)}>
            {this.props.text}
          </AppText>
        </View>
      </TouchableHighlight>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
}

Button.defaultProps = {
  text: 'Button'
}

const styles = StyleSheet.create({
  submitButton: {
    height: 36,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
})
