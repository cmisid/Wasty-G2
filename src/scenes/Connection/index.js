import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import t from 'tcomb-form-native'

import { authStyleSheet, Email, Password } from '../../formUtil'
import Button from '../../components/Button'
import { colors } from '../../style'

const Form = t.form.Form

const ConnectionForm = t.struct({
  email: Email,
  password: Password
})

const options = {
  error: 'Les mots de passe ne correspondent pas',
  fields: {
    email: {
      autoCapitalize: false,
      error: 'Veuillez rentrer une addresse valide',
      label: 'Addresse e-mail',
      placeholder: 'marie.dubois@gmail.com'
    },
    password: {
      label: 'Mot de passe',
      password: true,
      placeholder: '••••••',
      secureTextEntry: true
    }
  },
  order: [ 'email', 'password' ],
  stylesheet: authStyleSheet()
}

export default class ConnectionScene extends Component {

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
          type={ConnectionForm}
        />
        <View style={{height: 30}} />
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
