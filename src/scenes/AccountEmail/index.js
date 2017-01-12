import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { isNil, omitBy } from 'lodash'
import t from 'tcomb-form-native'

import { Email } from '../../formUtil'
import AppText from '../../components/AppText'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { toast } from '../../util'

const Form = t.form.Form

const AccountEmailForm = t.struct({
  email: Email
})

const options = {
  fields: {
    email: {
      autoCapitalize: false,
      error: 'Veuillez rentrer une addresse valide',
      label: 'Addresse e-mail'
    }
  },
  order: [ 'email' ]
}

export default class AccountEmailScene extends Component {

  onSubmit () {
    /**
     * Update the user's e-mail address.
     */
    const form = this.refs.form.getValue()

    // Make sure the form is valid
    if (form) {
      const newUser = Object.assign({}, this.props.currentUser)
      // Update the user's e-mail if he has entered a new one
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
            type={AccountEmailForm}
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

AccountEmailScene.propTypes = {
  currentUser: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
