import React, { Component } from 'react'
import {  ScrollView, StyleSheet, AsyncStorage } from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import TabBar from './components/TabBar'
import BasketScene from './scenes/BasketScene'
import ItemScene from './scenes/ItemScene'
import AccountScene from './scenes/AccountScene'
import { colors } from './style'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      items: [
        {
          "title": "Canapé cuir",
          "category": "AMEUBLEMENT",
          "publish_date": "18/12/2016",
          "coordinates": {
            "lat": 48.5712432,
            "lon": -3.1075241999999434
          }
        },
        {
          "title": "Portes coulissantes",
          "category": "BOIS ET MATERIAUX",
          "publish_date": "18/12/2016",
          "coordinates": {
            "lat": 48.560811,
            "lon": -3.148260
          }
        },
        {
          "title": "Frigo",
          "category": "ELECTROMENAGER",
          "publish_date": "17/12/2016",
          "coordinates": {
            "lat": 48.555107,
            "lon": -3.143054
          }
        }
      ]
    };
    this.watchID = null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  addItem(item) {
    const newItems = this.state.items.concat(item)
    this.setState({
      items: newItems
    })
    AsyncStorage.setItem('items', JSON.stringify(newItems))
  }

  render() {
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
          tabLabel='user'
        />
      </ScrollableTabView>
    )
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
