import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { forEach, isNil, omitBy } from 'lodash'
import t from 'tcomb-form-native'

import { User } from '../../classes'
import AppText from '../../components/AppText'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { toast } from '../../util'
import { carSizes, scps } from '../../data/constants'

const Form = t.form.Form

const AccountSettingsForm = t.struct({
  carSize: t.maybe(t.enums(carSizes)),
  firstName: t.String,
  gender: t.maybe(t.enums({female: 'Femme', male: 'Homme'})),
  lastName: t.String,
  scp: t.maybe(t.enums(scps))
})

const options = {
  fields: {
    gender: {
      label: 'Sexe',
      nullOption: {value: null, text: 'Aucun'}
    },
    firstName: {
      label: 'Prénom',
      error: 'Un prénom est requis'
    },
    lastName: {
      label: 'Nom',
      error: 'Un nom est requis'
    },
    scp: {
      label: 'PCS'
    },
    carSize: {
      label: 'Taille de la voiture'
    }
  },
  order: [ 'firstName', 'lastName', 'gender', 'scp', 'carSize' ]
}

export default class AccountSettingsScene extends Component {

  onSubmit () {
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
      // Trigger the user update callback if there was a change
      if (userWasModified) {
        this.props.updateUser(new User(newUser))
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
            type={AccountSettingsForm}
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

AccountSettingsScene.propTypes = {
  currentUser: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
