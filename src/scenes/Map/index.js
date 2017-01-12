import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'
import _ from 'lodash'

import MarkerContent from './components/MarkerContent'
import { getItems, getLikes } from '../../data/api'
import { colors } from '../../style'

const formatMarkers = (items) => items.map(function (item) {
  return {
    key: item.id,
    title: item.title,
    description: item.category.toUpperCase(),
    favorite: item.favorite,
    coordinate: {
      latitude: item.address.lat,
      longitude: item.address.lon
    }
  }
})

const enhance = (list, source) => {
  return _.map(list, (element) => _.extend({}, element, source))
}

const LATITUDE_DELTA = 0.015
const LONGITUDE_DELTA = 0.0121

export default class MapScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      markers: [],
      items: [],
      likes: [],
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
      mapSelected: false,
      // User location stuff
      initialPosition: null,
      lastPosition: null
    }
    this.watchID = null
  }

  componentWillMount () {
    // Partie un peu technique (applicable aux mocks) :
    // Pour différencier les objets qui ont déjà été mis en favoris par l'utilisateur de ceux ne l'étant pas,
    // il nous suffit simplement d'ajouter un attribut booléen 'favorite'.
    // L'API nous renverra plus tard des payload json contenant cet attribut
    getItems()
      .then(items => {
        const itemsEnhanced = enhance(items, { favorite: false })
        getLikes()
          .then(likes => {
            // TODO: add this `favorite` attribute to `likes.json`
            const likesEnhanced = enhance(likes, { favorite: true })
            this.setState({ items: itemsEnhanced.concat(likesEnhanced) })
          })
          .then(() => this.setState({ markers: formatMarkers(this.state.items) }))
          .then(() => console.log('markers', this.state.markers))
          .catch(() => {})
      })
      .catch(() => {})
  }

  componentDidMount () {
    // Get user position
    navigator.geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position)
        this.setState({initialPosition})
      },
      error => console.log('Erreur de localisation', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )

    this.watchID = navigator.geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position)
      this.setState({lastPosition})
    })

    // Access the user location coordinates and set them to the initial map region
    this.setState({
      region: {
        latitude: this.lastPosition ? this.lastPosition.coords.latitude : 43.589012,
        longitude: this.lastPosition ? this.lastPosition.coords.longitude : 1.450592,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
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

  findItemData (event) {
    // FIXME: if 2 items have the same coordinates, this component will raise an error
    // The iOS MapView returns a Marker.id which is not returned by the Android MapView
    // The Marker identifier refers to the item id
    const joinAttribute = obj => (obj.address.lat === event.coordinate.latitude && obj.address.lon === event.coordinate.longitude)
    const itemObject = _.find(this.state.items, obj => joinAttribute(obj))
    console.log(itemObject)
    return itemObject
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  likeItem (id, wasFavorite) {
    console.log(id, wasFavorite)
    // If wasFavorite == True, it means that the item has been unliked by the user
    // so we had to update the state and the markers
    const updatedItems = _.forEach(this.state.items, (obj) => {
      // If the user has never liked an item we update the item value as favorite
      // Else if the user is has already set an item as favorite then when we had to update his state
      if (obj.id === id && wasFavorite === false) {
        obj.favorite === true
      } else if (obj.id === id && wasFavorite === true) {
        obj.favorite === false
      }
      // TODO: make a POST to the API to update the items liked
    })

    console.log(id, wasFavorite, updatedItems)

    this.setState({
      items: updatedItems,
      markers: formatMarkers(updatedItems)
    }, () => this._renderMarkers())

    // Then go back to map view
    this.handleMapPressedEvent()
  }

  _renderMarkers () {
    return this.state.markers.map(marker => (
      <MapView.Marker
        key={marker.key}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
        pinColor={marker.favorite ? colors.markers.favorite : colors.markers.basic}
        onSelect={(e) => this.handleMarkerSelectedEvent(e)}
        onPress={(e) => this.handleMarkerSelectedEvent(e)}
      />
    ))
  }

  render () {
    // In order to display an Item component, we need to split the render part of MapScene into
    // 2 components because when a user press a marker we need to display the
    // Item properties into a component
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
            {this._renderMarkers()}
          </MapView>
        </View>
      )
    } else {
      // You can notice that this code is the same that above but here
      // we add a view to display the Item properties below the map view
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
            {this._renderMarkers()}
          </MapView>
          {/* Here we display the selected marker properties */}
          <View style={this.state.markerSelected ? {flex: 1} : {flex: 0, height: 0}}>
            <MarkerContent
              item={this.state.selectedMarker.coordinate ? this.findItemData(this.state.selectedMarker) : {}}
              onLikeItem={this.likeItem.bind(this)}
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
