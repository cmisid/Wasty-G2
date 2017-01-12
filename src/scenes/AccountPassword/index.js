import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { isNil, omitBy } from 'lodash'
import t from 'tcomb-form-native'

import AppText from '../../components/AppText'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { toast } from '../../util'

const Form = t.form.Form

// Refinement for making sure a password is long enough
const Password = t.refinement(t.String, str => str.length >= 6)

// Checks that the "password" and the "confirmation" fields are the same
const samePasswords = form => form.password === form.confirmation

const AccountPasswordForm = t.subtype(
  t.struct({
    confirmation: Password,
    password: Password
  }),
  samePasswords
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
    password: {
      label: 'Nouveau mot de passe',
      password: true,
      secureTextEntry: true,
      help: 'Au moins 6 caractères',
      error: 'Le mot de passe doit faire au moins 6 caractères'
    }
  },
  order: [ 'password', 'confirmation' ]
}

export default class AccountPasswordScene extends Component {

  onSubmit () {
    /**
     * Update the user's e-mail address.
     */
    const form = this.refs.form.getValue()

    // Make sure the form is valid
    if (form) {
      const newUser = Object.assign({}, this.props.currentUser)
      if (form.email !== this.props.currentUser.email) {
        newUser.email = form.email
        this.props.updateUser(newUser)
        // Notify the user
        toast(<AppText style={{fontWeight: 'bold'}}>{`Vos modifications ont bien été prises en compte`}</AppText>)
      }
    }
  }

  render () {
    return (
      <Container>
        <View style={styles.formWrapper}>
          <Form
            options={options}
            ref='form'
            type={AccountPasswordForm}
            value={omitBy(this.props.currentUser, isNil)} // the form can't handle null values
          />
          <Button
            onPress={this.onSubmit.bind(this)}
            text='Sauvegarder'
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
  }
})

AccountPasswordScene.propTypes = {
  currentUser: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
