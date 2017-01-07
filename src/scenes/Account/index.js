import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import UserView from '../../components/UserView'
import Container from '../../components/Container'
import { colors } from '../../style'
import { getUser } from '../../store/api'

export default class AccountScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    getUser()
      .then(user => { this.setState({user}) })
      .catch(() => { this.setState({user: {}}) })
  }

  updateUser (user) {
    this.setState({user})
  }

  render () {
    return (
      <Container>
        <UserView
          user={this.state.user}
        />
        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='list' size={24} />}
        >
          <ActionButton.Item
            buttonColor={colors.accent}
            title='Modifier mon mot de passe'
            onPress={() => {}}
          >
            <Icon name='lock-outline' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.accent}
            title='Modifier mon adresse e-mail'
            onPress={() => {}}
          >
            <Icon name='mail-outline' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.accent}
            title='Modifier mes informations'
            onPress={() => Actions.accountSettingsScene({
              currentUser: this.state.user,
              updateUser: this.updateUser.bind(this)
            })}
          >
            <Icon name='person-outline' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 24,
    color: 'white'
  }
})

AccountScene.propTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func
}
