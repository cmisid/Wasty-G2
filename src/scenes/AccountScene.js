import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { isEqual } from 'lodash'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import t from 'tcomb-form-native'

import { colors } from '../style'

const Form = t.form.Form

const User = t.struct({
  email: t.String,
  name: t.maybe(t.String),
  password: t.String,
  surname: t.maybe(t.String)
})

const options = {
  fields: {
    email: {
      label: 'Adresse e-mail',
      error: 'Rentrez une adresse e-mail valide'
    },
    name: {
      label: 'Prénom'
    },
    password: {
      label: 'Mot de passe',
      password: true
    },
    surname: {
      label: 'Nom'
    }
  },
  order: [ 'email', 'password', 'name', 'surname' ]
}

export default class AccountScene extends Component {

  onPress () {
    /**
     * Update the account settings. The update is triggered if the provided
     * settings are valid and are different from the previous ones.
     */
    const newAccountSettings = this.refs.form.getValue()
    if (newAccountSettings && !isEqual(newAccountSettings, this.props.accountSettings)) {
      this.props.updateAccountSettings(newAccountSettings)
    }
  }

  render () {
    return (
      <View style={styles.container}>

        <Form
          options={options}
          ref='form'
          type={User}
          value={this.props.accountSettings}
        />

        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='check' size={24} />}
          onPress={() => this.onPress()}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

AccountScene.propTypes = {
  accountSettings: React.PropTypes.object,
  updateAccountSettings: React.PropTypes.func
}
