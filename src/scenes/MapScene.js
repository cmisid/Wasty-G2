import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import MapView from 'react-native-maps'

import AppText from '../components/AppText'

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
      selectedMarker: {}
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

  changeMapLayout () {
    this.setState({
      map: {
        ...StyleSheet.absoluteFillObject,
        height: (Dimensions.get('window').height - 62) / 2
      }
    })
  }

  resetMapLayout () {
    this.setState({
      map: {
        ...StyleSheet.absoluteFillObject
      }
    })
    this.setState({ selectedMarker: {} })
  }

  handleSelectedEvent (event) {
    this.setState({ selectedMarker: event.nativeEvent })
    this.changeMapLayout()
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <MapView
          style={this.state.map}
          region={{
            latitude: 43.589012,
            longitude: 1.450592,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          onPress={(e) => this.resetMapLayout(e)}
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
              onSelect={(e) => this.handleSelectedEvent(e)}
            />
          ))}
        </MapView>
        <View>
          <AppText>{this.state.selectedMarker.id ? this.state.selectedMarker.id : "Aucun marker n'est sélectionné"}</AppText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: (Dimensions.get('window').height - 62) / 2
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 62,
    marginBottom: 50
  }
})
