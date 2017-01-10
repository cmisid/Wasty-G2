import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Toast from 'react-native-root-toast'
import { forEach, isNil, omitBy } from 'lodash'
import t from 'tcomb-form-native'

import { User } from '../../classes'
import Container from '../../components/Container'
import { colors } from '../../style'
import Button from '../../components/Button'
import AppText from '../../components/AppText'

const toast = text => Toast.show(text, {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 500,
  backgroundColor: colors.primary,
  shadowColor: colors.background,
  textColor: 'white'
})

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

  onSubmit () {
    /**
     * Update the account settings. The update is triggered if the provided
     * settings are valid and are different from the previous ones.
     */

    // FIXME: the following algorithm can probably be done with a lodash merge

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

      toast(<AppText style={StyleSheet.flatten(styles.toast)}>{`Vos informations ont bien été modifiées`}</AppText>)
    }
  }

  render () {
    return (
      <Container>
        <View style={styles.formWrapper}>
          <Form
            options={options}
            ref='form'
            type={AccountSettingsForm}
            value={omitBy(this.props.currentUser, isNil)}
          />
          <Button
            onPress={this.onSubmit.bind(this)}
            text='Save'
          />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    padding: 20
  },
  toast: {
    fontWeight: 'bold'
  }
})

AccountSettingsScene.propTypes = {
  currentUser: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
