import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'

import t from 'tcomb-form-native'

import Container from '../../components/Container'

const Form = t.form.Form

const ItemForm = t.struct({
  title: t.String,
  category: t.String,
  description: t.String,
  // disponibilitées du posteur
  beginHour: t.Date,
  endingHour: t.Date
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
    },
    beginHour: {
      label: 'Heure de début',
      error: 'Une heure de début est requise',
      mode: 'time'
    },
    endingHour: {
      label: 'Heure de fin',
      error: 'Une heure de fin est requise',
      mode: 'time'
    }
  },
  order: ['title', 'category', 'description', 'beginHour', 'endingHour']
}

export default class ItemPostScene extends Component {

  componentDidMount () {
    console.log(this.props.itemImgSource)
  }

  render () {
    return (
      <Container>
        <ScrollView>
          <View style={styles.formWrapper}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: this.props.itemImgSource.uri}}
            />
            <Form
              options={options}
              ref='form'
              type={ItemForm}
            />
          </View>
        </ScrollView>
      </Container>
    )
  }
}

ItemPostScene.propTypes = {
  itemImgSource: React.PropTypes.object
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    padding: 20
  }
})
