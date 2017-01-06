import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import t from 'tcomb-form-native'

import Container from '../components/Container'

const Form = t.form.Form

const ItemForm = t.struct({
  title: t.String,
  category: t.String,
  description: t.String
})

const options = {
  fields: {
    title: {
      label: 'Titre',
      error: 'Un titre est requis'
    },
    category: {
      label: 'Catégorie',
      error: 'Une catégorie est requise'
    },
    description: {
      label: 'Description',
      error: 'Une description est requise'
    }
  },
  order: [ 'title', 'category', 'description' ]
}

export default class PostItemScene extends Component {
  render () {
    return (
      <Container>
        <View style={styles.formWrapper}>
          <Form
            options={options}
            ref='form'
            type={ItemForm}
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
