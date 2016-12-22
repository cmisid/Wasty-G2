import React, { Component } from 'react'
import { Text, View } from 'react-native'

import MapView from 'react-native-maps'

export default class MapScene extends Component {

  render () {
    return (
      <View>
        <Text>Affichage de la carte</Text>
        <MapView
          initialRegion={{
            latitude: 48.57124,
            longitude: -3.107524,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    )
  };

}
