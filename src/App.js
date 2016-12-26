import React, { Component } from 'react'
import { Alert, NetInfo, StyleSheet } from 'react-native'

import { Scene, Router } from 'react-native-router-flux'

import Overlay from './components/Overlay'
import TabIcon from './components/TabIcon'
import AccountScene from './scenes/AccountScene'
import CartScene from './scenes/CartScene'
import SearchScene from './scenes/SearchScene'
import MapScene from './scenes/MapScene'
import NotificationsScene from './scenes/NotificationsScene'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      // Internet connection stuff
      isConnected: true,
      serverResponding: true,

      // User location stuff
      initialPosition: null,
      lastPosition: null
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
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render () {
    if (!this.state.isConnected) {
      return (<Overlay iconLabel='bolt' message='Vous êtes hors-ligne' />)
    } else if (!this.state.serverResponding) {
      return (<Overlay iconLabel='server' message='Le serveur ne répond pas' />)
    } else {
      return (
        <Router>
          <Scene key='root' tabs hideNavBar tabBarStyle={styles.tabBar}>
            <Scene
              title='Notifications'
              key='notifications'
              component={NotificationsScene}
              icon={TabIcon}
              iconName='notifications'
            />
            <Scene
              title='Panier'
              key='cart'
              component={CartScene}
              icon={TabIcon}
              iconName='shopping-cart'
            />
            <Scene
              title='Recherche'
              key='search'
              component={SearchScene}
              icon={TabIcon}
              iconName='search'
              initial
            />
            <Scene
              title='Carte'
              key='map'
              component={MapScene}
              icon={TabIcon}
              iconName='map'
            />
            <Scene
              title='Compte'
              key='account'
              component={AccountScene}
              icon={TabIcon}
              iconName='account-circle'
            />
          </Scene>
        </Router>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    backgroundColor: 'white',
    opacity: 1
  }
})
