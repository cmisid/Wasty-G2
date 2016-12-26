import React, { Component } from 'react'

import { isEqual } from 'lodash'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import t from 'tcomb-form-native'

import Container from '../Container'
import { colors } from '../style'

const Form = t.form.Form

const Account = t.struct({
  name: t.maybe(t.String),
  surname: t.maybe(t.String)
})

const options = {
  fields: {
    name: {
      label: 'Prénom'
    },
    surname: {
      label: 'Nom'
    }
  },
  order: [ 'name', 'surname' ]
}

export default class AccountSettingsForm extends Component {

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
      <Container>

        <Form
          options={options}
          ref='form'
          type={Account}
          value={this.props.currentAccountSettings}
        />

        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='check' size={24} />}
          onPress={() => this.onPress()}
        />

      </Container>
    )
  }
}

AccountSettingsForm.propTypes = {
  currentAccountSettings: React.PropTypes.object,
  updateAccountSettings: React.PropTypes.func
}
