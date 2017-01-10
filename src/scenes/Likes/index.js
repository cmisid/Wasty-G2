import React, { Component } from 'react'
import { ListView, StyleSheet, RefreshControl, TouchableHighlight, Linking, Alert, View } from 'react-native'

import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import ItemRow from './components/ItemRow'
import AppText from '../../components/AppText'
import Container from '../../components/Container'
import Separator from '../../components/Separator'
import { getLikes } from '../../data/api'
import { colors } from '../../style'
import { generateGoogleMapsItinerary } from '../../util'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class LikesScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      items: [],
      location: {
        lat: 48.566140,
        lon: -3.148260
      },
      // User location stuff
      initialPosition: null,
      lastPosition: null
    }
    this.watchID = null
  }

  _onRefresh () {
    this.setState({refreshing: true})
    getLikes()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false})
  }

  onDeleteItem (id) {
    const listWithoutItem = _.reject(this.state.items, {id: id})
    console.log(id, listWithoutItem)
    this.setState({items: listWithoutItem})
  }

  componentDidMount () {
    getLikes()
      .then(items => { this.setState({items}) })
      .catch(() => {})

    // Get user position
    navigator.geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position)
        this.setState({initialPosition})
      },
      error => Alert.alert('Erreur de localisation', JSON.stringify(error)),
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

  _getItemsLatLonCoords () {
    const userCoords = [{
      lat: this.lastPosition ? this.lastPosition.coords.latitude : 43.589012,
      lon: this.lastPosition ? this.lastPosition.coords.longitude : 1.450592
    }]
    // TODO: implémenter la logique pour savoir quel doit être l'ordre de passage
    const itemsCoords = this.state.items.map(obj => (
      {
        lat: obj.address.lat,
        lon: obj.address.lon
      })
    )
    return _.concat(userCoords, itemsCoords)
  }

  _generateItinerary () {
    const coords = this._getItemsLatLonCoords()
    const url = generateGoogleMapsItinerary(coords)
    Linking.openURL(url)
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <ListView
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={ds.cloneWithRows(this.state.items)}
          renderRow={item => (
            <ItemRow
              item={item}
              onDeleteItem={this.onDeleteItem.bind(this)}
              onPressAction={() => Actions.likesItemScene({item: item,
                userLat: this.state.location.lat,
                userLon: this.state.location.lon})}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          renderSeparator={(sectionId, rowId) => <Separator key={rowId} />}
          enableEmptySections
        />

        <TouchableHighlight style={styles.submitButton} onPress={() => this._generateItinerary.bind(this)} underlayColor={colors.primary}>
          <View>
            <AppText style={StyleSheet.flatten(styles.submitButtonText)}>
              Récupérer mes items
            </AppText>
          </View>
        </TouchableHighlight>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 7
  },
  submitButton: {
    height: 36,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
})
