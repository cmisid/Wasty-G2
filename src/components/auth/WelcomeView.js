import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import Auth0Lock from 'react-native-lock'

// TODO: use a .env file
const credentials = {
  clientId: '48MMqsWK35OcZonjLUW3DSADFuCMMx8x',
  domain: 'axelbellec.eu.auth0.com'
}

const lock = new Auth0Lock(credentials)

export default class WelcomeView extends Component {

  constructor (props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
  }

  onChangeAuth (auth) {
    this.setState(auth)
    AsyncStorage.setItem('auth', JSON.stringify(auth))
  }

  onLogin () {
    lock.show({
      closable: true
    }, (err, profile, token) => {
      if (err) {
        console.log(err)
        return
      }

      this.onChangeAuth({
        name: 'Profile',
        passProps: {
          profile: profile,
          token: token
        }
      })
      console.log(this.state)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={{uri: 'https://raw.githubusercontent.com/auth0/Mobile-Samples.React/master/Classic/Lock/img/badge.png'}}
          />
          <Text style={styles.title}>Auth0 Example</Text>
          <Text style={styles.subtitle}>Identity made simple for Developers</Text>
        </View>
        <TouchableHighlight
          style={styles.signInButton}
          underlayColor='#949494'
          onPress={this.onLogin}>
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#15204C'
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center'
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 151
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 4,
    color: '#FFFFFF'
  },
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
