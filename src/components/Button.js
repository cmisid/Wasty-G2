/*
Button is a custom button implementation that satisfies our needs. It's nothing
more than a TouchableHighlight wrapped around a View.

Button can take in an "onPress" func prop that can be called when the user taps
the button.

When a tap occurs then "onPress" is called and the button is "loading". In
loading state the provided text prop is replaced with an ActivityIndicator
(essentially a loading spinner).

When "onPress" finishes then the state is reset to normal and the loading
spinner dissapears.
*/

import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, StyleSheet, TouchableHighlight, View } from 'react-native'

import { colors } from '../style'
import AppText from './AppText'

export default class Button extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onPressEvent () {
    this.setState({loading: true})
    this.props.onPress()
    this.setState({loading: false})
  }

  render () {
    if (this.state.loading) {
      return (
        <TouchableHighlight
          onPress={() => this.onPressEvent()}
          style={[styles.submitButton, this.props.style || {}]}
          underlayColor={colors.primary}
        >
          <View>
            <ActivityIndicator
              animating
              style={styles.submitIcon}
              size='small'
              color='white'
            />
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          onPress={() => this.onPressEvent()}
          style={[styles.submitButton, this.props.style || {}]}
          underlayColor={colors.primary}
        >
          <View>
            <AppText
              onPress={() => this.onPressEvent()}
              style={StyleSheet.flatten(styles.submitButtonText)}
            >
              {this.props.text}
            </AppText>
          </View>
        </TouchableHighlight>
      )
    }
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
  },
  submitIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
})
