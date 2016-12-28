import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native'

import WelcomeView from '../components/auth/WelcomeView'
import ProfileView from '../components/auth/ProfileView'

import { colors } from '../style'

export default class SocialAuthScene extends Component {
  render () {
    return (
      <Navigator style={styles.navigator}
        initialRoute={{name: 'Welcome'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.nav}
            routeMapper={NavigationBarRouteMapper} />
          }
      />
    )
  }

  renderScene (route, navigator) {
    if (route.name === 'Welcome') {
      return <WelcomeView navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'Profile') {
      return <ProfileView navigator={navigator} {...route.passProps} />
    }
  }
}

var NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor='transparent'
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={styles.leftNavButtonText}>Back</Text>
        </TouchableHighlight>)
    } else {
      return null
    }
  },

  RightButton (route, navigator, index, navState) {
    return null
  },

  Title (route, navigator, index, navState) {
    return <Text style={styles.title}>Auth0 Sample</Text>
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 62,
    marginBottom: 50
  },
  title: {
    marginTop: 4,
    fontSize: 16
  },
  leftNavButtonText: {
    fontSize: 18,
    marginLeft: 13,
    marginTop: 2
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight: 13,
    marginTop: 2
  },
  nav: {
    height: 60,
    backgroundColor: '#efefef'
  }
})

