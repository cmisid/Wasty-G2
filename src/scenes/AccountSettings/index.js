import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, TouchableHighlight, View } from 'react-native'

import { forEach, isNil, omitBy } from 'lodash'
import t from 'tcomb-form-native'

import { User } from '../../classes'
import AppText from '../../components/AppText'
import Container from '../../components/Container'
import { colors } from '../../style'

const Form = t.form.Form

const Genders = t.enums({
  male: 'Male',
  female: 'Female'
})

const AccountSettingsForm = t.struct({
  firstName: t.String,
  gender: t.maybe(Genders),
  lastName: t.String
})

const options = {
  fields: {
    gender: {
      label: 'Sexe'
    },
    firstName: {
      label: 'Prénom',
      error: 'Un prénom est requis'
    },
    lastName: {
      label: 'Nom',
      error: 'Un nom est requis'
    }
  },
  order: [ 'firstName', 'lastName', 'gender' ]
}

export default class AccountSettingsScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  onSubmit () {
    /**
     * Update the account settings. The update is triggered if the provided
     * settings are valid and are different from the previous ones.
     */

    // FIXME: the following algorithm can probably be done with a lodash merge

    this.setState({submitting: true})

    const form = this.refs.form.getValue()

    // Make sure the form is valid
    if (form) {
      // Clone the current user
      const newUser = Object.assign({}, this.props.currentUser)
      let userWasModified = false
      // Iterate through each field in the form and check if it is different from the current user
      forEach(form, (value, key) => {
        if (newUser[key] !== value) {
          newUser[key] = value
          userWasModified = true
        }
      })
      // Trigger the user update callback if there was a change
      if (userWasModified) this.props.updateUser(new User(newUser))

      this.setState({submitting: false})
    }
  }

  render () {
    // FIXME: this conditional rendering could be way better
    if (this.state.submitting) {
      return (
        <Container>
          <View style={styles.formWrapper}>
            <Form
              options={options}
              ref='form'
              type={AccountSettingsForm}
              value={omitBy(this.props.currentUser, isNil)}
            />
            <TouchableHighlight style={styles.submitButton} onPress={() => this.onSubmit()} underlayColor={colors.primary}>
              <View>
                <ActivityIndicator
                  animating
                  style={styles.submitIcon}
                  size='small'
                />
              </View>
            </TouchableHighlight>
          </View>
        </Container>
      )
    } else {
      return (
        <Container>
          <View style={styles.formWrapper}>
            <Form
              options={options}
              ref='form'
              type={AccountSettingsForm}
              value={omitBy(this.props.currentUser, isNil)}
            />
            <TouchableHighlight style={styles.submitButton} onPress={() => this.onSubmit()} underlayColor={colors.primary}>
              <View>
                <AppText style={StyleSheet.flatten(styles.submitButtonText)}>Save</AppText>
              </View>
            </TouchableHighlight>
          </View>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    padding: 20
  },
  submitButton: {
    height: 36,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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

AccountSettingsScene.propTypes = {
  currentUser: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
