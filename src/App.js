import React, { Component } from 'react'
import { NetInfo, StyleSheet } from 'react-native'

import { Actions, Router, Scene } from 'react-native-router-flux'

import Overlay from './components/Overlay'
import RouterTitle from './components/RouterTitle'
import TabIcon from './components/TabIcon'

import AccountEmailScene from './scenes/AccountEmail'
import AccountPasswordScene from './scenes/AccountPassword'
import AccountScene from './scenes/Account'
import AccountSettingsScene from './scenes/AccountSettings'
import ConnectionScene from './scenes/Connection'
import ItemScene from './scenes/Item'
import ItemPostScene from './scenes/ItemPost'
import LikesScene from './scenes/Likes'
import MapScene from './scenes/Map'
import PostsScene from './scenes/Posts'
import RegistrationScene from './scenes/Registration'
import SearchScene from './scenes/Search'
import UserScene from './scenes/User'
import { colors } from './style'

import { isProd, appEnv } from './config'

// Disable RCTAnimation warning
console.ignoredYellowBox = ['Animated: `useNativeDriver` is not']
// Disable Swipeout warning
console.ignoredYellowBox = ['Warning: Failed prop type: Invalid prop `text` of type `object` supplied to `SwipeoutBtn`']
// Disable the warning when autoCapitalize is set to "false" in tcomb-form-native
console.ignoredYellowBox = ['Warning: ReactNative.createElement: Invalid prop `autoCapitalize` of value `false` supplied to `TextInput`']

console.disableYellowBox = true

const styles = StyleSheet.create({
  sceneStyle: {
    flex: 1
  },
  tabBar: {
    borderTopWidth: 0.5,
    borderColor: colors.background,
    backgroundColor: 'white',
    opacity: 1
  }
})

// Application scene layout/structure
const appScenes = Actions.create(
  <Scene key='root' tabs hideNavBar tabBarStyle={styles.tabBar}>

    <Scene title='Mes posts' key='postsScene' icon={TabIcon} iconName='playlist-add'>
      <Scene title='Mes posts' key='postsViewScene' component={PostsScene} />
      <Scene title='Mes posts' key='postsItemScene' component={ItemScene} />
      <Scene title='Mes posts' key='postsUserScene' component={UserScene} />
    </Scene>

    <Scene title='Mes likes' key='likesScene' icon={TabIcon} iconName='playlist-add-check'>
      <Scene title='Mes likes' key='likesViewScene' component={LikesScene} />
      <Scene title='Mes likes' key='likesItemScene' component={ItemScene} />
    </Scene>

    <Scene title='Recherche' key='searchScene' icon={TabIcon} iconName='search' initial>
      <Scene title='Recherche' key='searchViewScene' component={SearchScene} />
      <Scene title='Recherche' key='searchItemScene' component={ItemScene} />
      <Scene title='Poster' key='searchItemPostScene' component={ItemPostScene} />
      <Scene title='Recherche' key='searchUserScene' component={UserScene} />
    </Scene>

    <Scene title='Carte' key='mapScene' component={MapScene} icon={TabIcon} iconName='map' />

    <Scene title='Compte' key='accountScene' icon={TabIcon} iconName='account-circle'>
      <Scene title='Compte' key='accountViewScene' component={AccountScene} />
      <Scene title='Compte' key='accountItemScene' component={ItemScene} />
      <Scene title='Compte' key='accountUserScene' component={UserScene} />
      <Scene title='Modifier mes informations' key='accountSettingsScene' component={AccountSettingsScene} />
      <Scene title='Modifier mon addresse e-mail' key='accountEmailScene' component={AccountEmailScene} />
      <Scene title='Modifier mon mot de passe' key='accountPasswordScene' component={AccountPasswordScene} />
    </Scene>

  </Scene>
)

const authScenes = Actions.create(
  <Scene key='root'>
    <Scene key='connectionScene' component={ConnectionScene} title='Se connecter' />
    <Scene key='registrationScene' component={RegistrationScene} title='Créer un compte' initial />
  </Scene>
)

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: true, // Indicates if the user is logged in
      isConnected: true, // Indicates if the user is connected to the internet
      serverResponding: true, // Indicates if the server is responsing
      initialPosition: null, // User position at launchtime
      lastPosition: null // Latest user position
    }
    this.watchID = null
  }

  componentWillMount () {
    console.log(`App running in ${appEnv} mode (isProd=${isProd})`)
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
      error => console.log(
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
    } else if (!this.state.isLoggedIn) {
      return (<Router scenes={authScenes} />)
    } else {
      return (
        <Router
          renderTitle={scene => <RouterTitle scene={scene} />}
          scenes={appScenes}
          sceneStyle={styles.sceneStyle}
        />
      )
    }
  }
}
