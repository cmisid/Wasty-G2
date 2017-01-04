import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'
import _ from 'lodash'

import ItemMap from '../components/ItemMap'

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

const LATITUDE_DELTA = 0.015
const LONGITUDE_DELTA = 0.0121

export default class MapScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      markers: [],
      items: [],
      map: {
        ...StyleSheet.absoluteFillObject
      },
      region: {
        latitude: 43.589012,
        longitude: 1.450592,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
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
      markerSelected: true,
      region: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
    console.log('handleMarkerSelectedEvent()', this.state)
  }

  findItemData (markerId) {
    const itemObject = _.find(this.state.items, (obj) => obj.id === markerId)
    console.log(itemObject)
    return itemObject
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  render () {
    if (!this.state.markerSelected) {
      return (
        <View style={styles.wrapper}>
          <MapView
            style={{flex: 1}}
            region={this.state.region}
            onPress={(e) => this.handleMapPressedEvent()}
            onRegionChange={this.onRegionChange.bind(this)}
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
                onPress={(e) => this.handleMarkerSelectedEvent(e)}
              />
            ))}
          </MapView>
        </View>
      )
    } else {
      return (
        <View style={styles.wrapper}>
          <MapView
            style={{flex: 1}}
            region={this.state.region}
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
                onPress={(e) => this.handleMarkerSelectedEvent(e)}
              />
            ))}
          </MapView>
          <View style={this.state.markerSelected ? {flex: 1} : {flex: 0, height: 0}}>
            <ItemMap
              item={this.state.selectedMarker.id ? this.findItemData(this.state.selectedMarker.id) : {}}
              userLat={this.state.coordinate.latitude}
              userLon={this.state.coordinate.longitude}
            />
          </View>
        </View>
      )
    }
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
