import React, { Component } from 'react'

import t, { Form } from 'tcomb-form-native'

const User = t.struct({
  name: t.maybe(t.String),
  surname: t.maybe(t.String),
  age: t.maybe(t.Number),
  rememberMe: t.Boolean
})

const options = {

}

export default class PreferencesForm extends Component {
  render () {
    return (
    )
  }
}
