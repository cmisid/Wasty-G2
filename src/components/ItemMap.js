import React, {Component} from 'react'
import { StyleSheet, Dimensions } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import AppText from './AppText'
import Card from './card/Card'
import CardFooter from './card/CardFooter'
import ProgressiveImage from './ProgressiveImage'

// Google Maps
const generateMapLink = (sourceLat, sourceLon, destLat, destLon) => (
  `http://maps.google.com/maps?saddr=${sourceLat},${sourceLon}&daddr=${destLat},${destLon}`
)

const toRad = x => x * Math.PI / 180

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

  return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const distanceFmt = dist => dist < 1 ? `${Math.round((dist * 1000).toFixed(2), 1)} m` : `${Math.round(dist.toFixed(2), 1)} km`

export default class ItemMap extends Component {
  render () {
    return (
      <Card>
        <AppText>{this.props.item.title}</AppText>
        <AppText>{this.props.item.category}</AppText>

        <ProgressiveImage
          thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
          imageSource={{ uri: this.props.item.imgUrl }}
          style={styles.image}
        />
        <CardFooter
          publishDate={distanceInWordsToNow(
            this.props.item.publishDate,
            {locale: frLocale, addSuffix: true}
          )}
          streetName={this.props.item.streetName}
          cityName={this.props.item.cityName}
          userImg={this.props.item.publisher.imgUrl}
          username={`${this.props.item.publisher.firstName} ${this.props.item.publisher.lastName}`}
          distance={distanceFmt(haversineDistance(
            this.props.userLat,
            this.props.userLon,
            this.props.item.lat,
            this.props.item.lon
          ))}
          mapUrl={generateMapLink(
            this.props.userLat,
            this.props.userLon,
            this.props.item.lat,
            this.props.item.lon
          )}
          views={this.props.item.nViews}
        />
      </Card>
    )
  }
}

ItemMap.propTypes = {
  item: React.PropTypes.object,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}

const styles = StyleSheet.create({
  image: {
    flex: 2,
    width: Dimensions.get('window').width
  }
})
