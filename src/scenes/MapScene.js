import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import MapView from 'react-native-maps'

import { getItems } from '../store/api'
import { colors } from '../style'

export default class MapScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      items: {}
    }
  }

  componentDidMount () {
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.map}
          region={{
            latitude: 48.571243,
            longitude: -3.107524,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation
          loadingEnabled
          loadingIndicatorColor={colors.primary}
        />
      </View>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 62,
    marginBottom: 50
  },
  list: {
    flex: 1
  }
})
