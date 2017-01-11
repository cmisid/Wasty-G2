import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import UserScene from '../User'
import { colors } from '../../style'
import { getUser } from '../../data/api'

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
      <View style={{flex: 1}}>
        <UserScene user={this.state.user} />
        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='list' size={24} />}
          offsetY={80} // Hack because we're using the UserScene which is wrapped by a Container
        >
          <ActionButton.Item
            buttonColor={colors.accent}
            title='Modifier mon mot de passe'
            onPress={() => Actions.accountPasswordScene({
              currentUser: this.state.user,
              updateUser: this.updateUser.bind(this)
            })}
          >
            <Icon name='lock-outline' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.accent}
            title='Modifier mon adresse e-mail'
            onPress={() => Actions.accountEmailScene({
              currentUser: this.state.user,
              updateUser: this.updateUser.bind(this)
            })}
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
      </View>
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
