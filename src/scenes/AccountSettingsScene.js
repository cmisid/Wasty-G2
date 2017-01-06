import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { forEach } from 'lodash'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import t from 'tcomb-form-native'

import { User } from '../classes'
import Container from '../components/Container'
import { colors } from '../style'

const Form = t.form.Form

const AccountForm = t.struct({
  firstName: t.String,
  lastName: t.String
})

const options = {
  fields: {
    firstName: {
      label: 'Prénom',
      error: 'Un prénom est requis'
    },
    lastName: {
      label: 'Nom',
      error: 'Un nom est requis'
    }
  },
  order: [ 'firstName', 'lastName' ]
}

export default class AccountScene extends Component {

  onConfirm () {
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
      console.log(this.props.currentUser)
      console.log(form)
      console.log(newUser)
      // Trigger the user update callback if there was a change
      if (userWasModified) this.props.updateUser(new User(newUser))
    }
  }

  render () {
    return (
      <Container>
        <View style={styles.formWrapper}>
          <Form
            options={options}
            ref='form'
            type={AccountForm}
            value={this.props.currentUser}
          />
          <ActionButton
            buttonColor={colors.primary}
            icon={<Icon color='white' name='check' size={24} />}
            onPress={() => this.onConfirm()}
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

AccountScene.propTypes = {
  currentUser: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
