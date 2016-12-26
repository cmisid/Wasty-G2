import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../components/AppText'
import Container from '../components/Container'
import { colors } from '../style'

export default class AccountScene extends Component {
  render () {
    return (
      <Container>
        <AppText>{this.props.accountSettings.name}</AppText>
        <AppText>{this.props.accountSettings.surname}</AppText>
        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='list' size={24} />}
        >
          <ActionButton.Item buttonColor='#9b59b6' title='Modifier mon mot de passe' onPress={() => console.log('notes tapped!')}>
            <Icon name='lock' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title='Modifier mon adresse e-mail' onPress={() => {}}>
            <Icon name='mail-outline' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title='Modifier mes informations' onPress={() => {}}>
            <Icon name='person' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
})

AccountScene.propTypes = {
  accountSettings: React.PropTypes.object,
  updateAccountSettings: React.PropTypes.func
}
