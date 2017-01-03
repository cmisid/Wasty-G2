import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

import MapView from 'react-native-maps'

import { getItems } from '../store/api'
import { colors } from '../style'

const formatMarkers = (items) => items.map(function (item) {
  return {
    key: `${item.title} - ${item.publishDate}`,
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
      coordinate: {
        latitude: 43.588958,
        longitude: 1.450104
      }
    }
  }

  componentWillMount () {
    getItems()
      .then(items => { this.setState({markers: formatMarkers(items)}) })
      .catch(() => {})
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.map}
          region={{
            latitude: 43.589012,
            longitude: 1.450592,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation
          loadingEnabled
          loadingIndicatorColor={colors.primary}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              pinColor={colors.primary}
              onPress={(e) => console.log('onPress', e)}
            />
          ))}
        </MapView>
      </View>
    )
  };

}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 2,
    height: (Dimensions.get('window').height - 62) / 2
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 62,
    marginBottom: 50
  }
})
