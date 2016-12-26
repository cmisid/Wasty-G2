import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { isEqual } from 'lodash'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import t from 'tcomb-form-native'

import Container from '../Container'
import { colors } from '../../style'

const Form = t.form.Form

const Account = t.struct({
  name: t.String,
  surname: t.String
})

const options = {
  fields: {
    name: {
      label: 'Prénom',
      error: 'Un prénom est requis'
    },
    surname: {
      label: 'Nom',
      error: 'Un nom est requis'
    }
  },
  order: [ 'name', 'surname' ]
}

export default class AccountSettingsForm extends Component {

  onConfirm () {
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
        <View style={styles.formWrapper}>
          <Form
            options={options}
            ref='form'
            type={Account}
            value={this.props.currentAccountSettings}
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

AccountSettingsForm.propTypes = {
  currentAccountSettings: React.PropTypes.object,
  updateAccountSettings: React.PropTypes.func
}
