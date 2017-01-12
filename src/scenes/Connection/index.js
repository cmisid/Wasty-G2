import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import t from 'tcomb-form-native'

import { Email, Password } from '../../formUtil'
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
      label: 'Addresse e-mail',
      error: 'Veuillez rentrer une addresse valide'
    },
    password: {
      label: 'Mot de passe',
      password: true,
      secureTextEntry: true
    }
  },
  order: [ 'email', 'password' ]
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
