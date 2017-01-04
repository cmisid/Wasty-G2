import React, { Component } from 'react'
import { StyleSheet, RefreshControl, ScrollView} from 'react-native'

import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import UserView from '../components/UserView'
import Container from '../components/Container'
import { colors } from '../style'
import { getEvents, getUser } from '../store/api'

export default class AccountScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      events: [],
      user: {}
    }
  }

  componentDidMount () {
    getUser()
      .then(user => { this.setState({user}) })
      .catch(() => { this.setState({user: {}}) })

    getEvents()
      .then(events => { this.setState({events}) })
      .catch(() => { this.setState({events: []}) })
  }

  updateUser (user) {
    this.setState({user})
  }

  _onRefresh() {
    this.setState({refreshing: true});
    
    getUser()
      .then(user => { this.setState({user}) })
      .catch(() => { this.setState({user: {}}) })

    getEvents()
      .then(events => { this.setState({events}) })
      .catch(() => { this.setState({events: []}) })
    
    this.setState({refreshing: false});
  }

  render () {
      return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >  
        <Container>
          <UserView events={this.state.events} user={this.state.user}         
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
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
              onPress={() => Actions.userScene({
                currentUser: this.state.user,
                updateUser: this.updateUser.bind(this)
              })}
            >
              <Icon name='person-outline' style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </Container>
    </ScrollView>
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
