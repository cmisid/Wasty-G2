import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'

import { authStyleSheet, Email, Password, passwordChecker } from '../../formUtil'
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
      error: 'Le mot de passe doit faire au moins 6 caractères',
      label: 'Confirmation',
      placeholder: '••••••',
      password: true,
      secureTextEntry: true
    },
    email: {
      autoCapitalize: false,
      error: 'Veuillez rentrer une addresse valide',
      label: 'Addresse e-mail',
      placeholder: 'marie.dubois@gmail.com'
    },
    firstName: {
      error: 'Un prénom est requis',
      label: 'Prénom',
      placeholder: 'Marie'
    },
    lastName: {
      error: 'Un nom est requis',
      label: 'Nom',
      placeholder: 'Dubois'
    },
    password: {
      error: 'Le mot de passe doit faire au moins 6 caractères',
      label: 'Mot de passe',
      placeholder: '••••••',
      password: true,
      secureTextEntry: true
    }
  },
  order: [ 'firstName', 'lastName', 'email', 'password', 'confirmation' ],
  stylesheet: authStyleSheet()
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
        <View style={{height: 10}} />
        <Button onPress={() => Actions.connectionScene()} text='Se connecter' />
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
