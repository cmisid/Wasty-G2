import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'
import _ from 'lodash'

import ItemRow from '../components/ItemRow'

import { getItems } from '../store/api'
import { colors } from '../style'

const formatMarkers = (items) => items.map(function (item) {
  return {
    key: item.id,
    title: item.title,
    description: item.category,
    coordinate: {
      latitude: item.lat,
      longitude: item.lon
    }
  }
})

export default class MapScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      markers: [],
      items: [],
      map: {
        ...StyleSheet.absoluteFillObject
      },
      coordinate: {
        latitude: 43.588958,
        longitude: 1.450104
      },
      selectedMarker: {},
      markerSelected: false,
      mapSelected: false
    }
  }

  componentWillMount () {
    getItems()
      .then(items => {
        this.setState({markers: formatMarkers(items)})
        this.setState({ items })
      })
      .catch(() => {})
  }

  handleMapPressedEvent () {
    this.setState({
      selectedMarker: {},
      mapSelected: true,
      markerSelected: false
    })
    console.log('handleMapPressedEvent()', this.state)
  }

  handleMarkerSelectedEvent (event) {
    this.setState({
      selectedMarker: event.nativeEvent,
      mapSelected: false,
      markerSelected: true
    })
    console.log('handleMarkerSelectedEvent()', this.state)
  }

  findItemData (markerId) {
    const itemObject = _.find(this.state.items, (obj) => obj.id === markerId)
    console.log(itemObject)
    return itemObject
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <MapView
          style={{flex: 1}}
          region={{
            latitude: 43.589012,
            longitude: 1.450592,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          onPress={(e) => this.handleMapPressedEvent()}
          showsUserLocation
          loadingEnabled
          loadingIndicatorColor={colors.primary}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              identifier={marker.key}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              pinColor={colors.primary}
              onSelect={(e) => this.handleMarkerSelectedEvent(e)}
            />
          ))}
        </MapView>
        <View style={this.state.markerSelected ? {flex: 1} : {flex: 0, height: 0}}>
          <ItemRow
            item={this.state.selectedMarker.id ? this.findItemData(this.state.selectedMarker.id) : {}}
            userLat={this.state.coordinate.latitude}
            userLon={this.state.coordinate.longitude}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightBackground,
    marginTop: 62,
    marginBottom: 50
  }
})
