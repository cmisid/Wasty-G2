import React, { Component } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Overlay from './components/Overlay'
import TabBar from './components/TabBar'
import BasketScene from './scenes/BasketScene'
import ItemScene from './scenes/ItemScene'
import AccountScene from './scenes/AccountScene'
import { getItems } from './store/api'
import { colors } from './style'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      // Internet connection stuff
      online: true,
      serverResponding: true,

      // User location stuff
      initialPosition: null,
      lastPosition: null,

      // Application stuff
      items: []
    }
    this.watchID = null
  }

  componentWillMount () {
    this.setState({'items': getItems()})
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        var initialPosition = JSON.stringify(position)
        this.setState({initialPosition})
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition(position => {
      var lastPosition = JSON.stringify(position)
      this.setState({lastPosition})
    })
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }

  addItem (item) {
    const newItems = this.state.items.concat(item)
    this.setState({
      items: newItems
    })
    AsyncStorage.setItem('items', JSON.stringify(newItems))
  }

  render () {
    if (!this.state.online) {
      return (
        <Overlay iconLabel='bolt' message='You are offline' />
      )
    } else if (!this.state.serverResponding) {
      return (
        <Overlay iconLabel='server' message='Server is not responding' />
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
            addItem={this.addItem.bind(this)}
            items={this.state.items}
            tabLabel='search'
          />
          <AccountScene
            tabLabel='user-circle'
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
