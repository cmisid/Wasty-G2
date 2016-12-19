/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage, 
  Text
} from 'react-native';

import ItemScene from './scenes/ItemScene'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default class Wasty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          "title": "Canapé cuir",
          "category": "AMEUBLEMENT",
          "publish_date": "18/12/2016",
          "coordinates": {
            "lat": 48.5712432
            "lon": -3.1075241999999434
          }
        },
        {
          "title": "Portes coulissantes",
          "category": "BOIS ET MATERIAUX",
          "publish_date": "18/12/2016",
          "coordinates": {
            "lat": 48.560811
            "lon": -3.148260
          }
        },
        {
          "title": "Frigo",
          "category": "ELECTROMENAGER",
          "publish_date": "17/12/2016",
          "coordinates": {
            "lat": 48.555107
            "lon": -3.143054
          }
        }
      ]
    }
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
        tabBarActiveTextColor='seagreen'
        tabBarUnderlineStyle={styles.tabBarUnderline}
        style={{marginTop: 20}}
      >
        <ItemScene
          tabLabel='ANNONCES'
          items={this.state.items}
          addItem={this.addItem.bind(this)}
        />
        <Text tabLabel='AUTOUR DE MOI'>Carte</Text>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabBarUnderline: {
    backgroundColor: 'seagreen',
    padding: 3
  },
});

AppRegistry.registerComponent('Wasty', () => Wasty);
