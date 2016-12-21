import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import _ from 'lodash'
import Button from 'react-native-button'
import Modal from 'react-native-modalbox'

import { colors } from '../style.js'

export default class AddItemModal extends Component {

  constructor() {
    super();
    this.state = {
      title: null,
      category: null,
      publish_date: null
    };
  }

  openModal() {
    this.refs.modal.open()
  }

  closeModal() {
    this.refs.modal.close()
  }

  validTitle() {
    return this.state.title !== null && this.state.title !== ''
  }

  validCategory() {
    return this.state.category !== null && this.state.category !== ''
  }

  validDate() {
    return this.state.publish_date !== null && this.state.publish_date !== ''
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        ref={'modal'}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Ajouter un item</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={title => this.setState({'title': _.upperFirst(_.toLower(title))})}
            placeholder='Titre'
          />
          <TextInput
            style={styles.textInput}
            onChangeText={category => {this.setState({'category': _.upperFirst(_.toLower(category))})}}
            placeholder='Catégorie'
          />
          <TextInput
            style={styles.textInput}
            onChangeText={publish_date => {this.setState({'publish_date': publish_date})}}
            placeholder='Date'
          />
          <Button
            style={styles.confirmButton}
            styleDisabled={{color: '#7e7e7e'}}
            disabled={!this.validTitle() || !this.validCategory() || !this.validDate()}
            containerStyle={styles.confirmButtonContainer}
            onPress={() => {this.props.onConfirm(this.state); this.closeModal()}}
          >
            Ajouter
          </Button>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: 180,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalContainer: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    color: colors.primary
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 6,
    marginTop: 10
  },
  confirmButtonContainer: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'white'
  },
  confirmButton: {
    fontSize: 20,
    color: colors.primary
  }
})

AddItemModal.propTypes = {
  modalIsOpen: React.PropTypes.bool,
  onConfirm: React.PropTypes.func
}
