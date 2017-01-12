import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import t from 'tcomb-form-native'

import { Email, Password, passwordChecker } from '../../formUtil'
import Button from '../../components/Button'
import { colors } from '../../style'

const Form = t.form.Form

const AccountPasswordForm = t.subtype(
  t.struct({
    confirmation: Password,
    email: Email,
    firstName: t.String,
    lastName: t.String,
    password: Password
  }),
  passwordChecker
)

const options = {
  error: 'Les mots de passe ne correspondent pas',
  fields: {
    confirmation: {
      label: 'Confirmation du nouveau mot de passe',
      password: true,
      secureTextEntry: true,
      help: 'Au moins 6 caractères',
      error: 'Le mot de passe doit faire au moins 6 caractères'
    },
    email: {
      label: 'Addresse e-mail',
      error: 'Veuillez rentrer une addresse valide'
    },
    firstName: {
      label: 'Prénom',
      error: 'Un prénom est requis'
    },
    lastName: {
      label: 'Nom',
      error: 'Un nom est requis'
    },
    password: {
      label: 'Nouveau mot de passe',
      password: true,
      secureTextEntry: true,
      help: 'Au moins 6 caractères',
      error: 'Le mot de passe doit faire au moins 6 caractères'
    }
  },
  order: [ 'firstName', 'lastName', 'email', 'password', 'confirmation' ]
}

export default class RegistrationScene extends Component {

  onSubmit () {
    /**
     * Register the user on the server.
     */
    const form = this.refs.form.getValue()

    // Make sure the form is valid
    if (form) {
      console.log('coucou')
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Form
          options={options}
          ref='form'
          type={AccountPasswordForm}
        />
        <Button onPress={this.onSubmit.bind(this)} text='Créer mon compte' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  message: {
    color: colors.secondary,
    fontSize: 30,
    alignSelf: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  }
})
