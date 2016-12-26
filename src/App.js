import React, { Component } from 'react'
import { Alert, AsyncStorage, NetInfo, StyleSheet } from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Overlay from './components/Overlay'
import TabBar from './components/TabBar'
import BasketScene from './scenes/BasketScene'
import ItemScene from './scenes/ItemScene'
import AccountScene from './scenes/AccountScene'
import { getAccountSettings, getItems } from './store/api'
import { colors } from './style'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      // Internet connection stuff
      isConnected: true,
      serverResponding: true,

      // User location stuff
      initialPosition: null,
      lastPosition: null,

      // Application stuff
      items: [],
      accountSettings: {}
    }
    this.watchID = null
  }

  componentWillMount () {
    // Check user internet connection
    const setIsConnected = isConnected => this.setState({isConnected})
    NetInfo.isConnected.addEventListener('change', setIsConnected)
  }

  componentDidMount () {
    // Get user position
    navigator.geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position)
        this.setState({initialPosition})
      },
      error => Alert.alert(
        'Erreur de localisation',
        JSON.stringify(error)
      ),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position)
      this.setState({lastPosition})
    })

    // Load initial state
    getAccountSettings()
      .then(accountSettings => { this.setState({accountSettings: JSON.parse(accountSettings)}) })
      .catch(() => { this.setState({accountSettings: {}}) })

    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }

  postItem (item) {
    const items = this.state.items.concat(item)
    this.setState({items})
    AsyncStorage.setItem('items', JSON.stringify(items))
  }

  updateAccountSettings (accountSettings) {
    this.setState({accountSettings})
    AsyncStorage.setItem('accountSettings', JSON.stringify(accountSettings))
  }

  render () {
    if (!this.state.isConnected) {
      return (
        <Overlay
          iconLabel='bolt'
          message='Vous êtes hors-ligne'
        />
      )
    } else if (!this.state.serverResponding) {
      return (
        <Overlay
          iconLabel='server'
          message='Le serveur ne répond pas'
        />
      )
    } else {
      return (
        <ScrollableTabView
          initialPage={1}
          renderTabBar={() => <TabBar />}
          style={styles.tabBar}
          tabBarActiveTextColor={colors.primary}
          tabBarPosition='top'
          tabBarUnderlineStyle={styles.tabBarUnderline}
        >
          <BasketScene
            tabLabel='shopping-basket'
          />
          <ItemScene
            items={this.state.items}
            geoLocation={{'lat': 48.566140, 'lon': -3.148260}}
            postItem={this.postItem.bind(this)}
            tabLabel='search'
          />
          <AccountScene
            accountSettings={this.state.accountSettings}
            tabLabel='user-circle'
            updateAccountSettings={this.updateAccountSettings.bind(this)}
          />
        </ScrollableTabView>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabBar: {
    marginTop: 20
  },
  tabBarUnderline: {
    height: 0
  }
})
