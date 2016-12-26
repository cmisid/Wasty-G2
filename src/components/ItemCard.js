import React, {Component} from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'

import Lightbox from 'react-native-lightbox'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import Card from './card/Card'
import CardHeader from './card/CardHeader'
import CardFooter from './card/CardFooter'

// Google Maps
const generateMapLink = (sourceLat, sourceLon, destLat, destLon) => `http://maps.google.com/maps?saddr=${sourceLat},${sourceLon}&daddr=${destLat},${destLon}`

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

export default class ItemCard extends Component {
  // TODO: add TouchableOpacity parent
  render () {
    return (
      <Card>
        <CardHeader
          title={this.props.title}
          category={this.props.category}
        />
        <Lightbox
          navigator={this.props.navigator}
          swipeToDismiss
        >
          <Image
            style={styles.image}
            source={{uri: this.props.imgUrl}}
          />
        </Lightbox>

        <CardFooter
          publishDate={distanceInWordsToNow(this.props.publishDate, {locale: frLocale, addSuffix: true})}
          streetName={this.props.streetName}
          cityName={this.props.cityName}
          userImg={this.props.userImg}
          username={this.props.username}
          distance={distanceFmt(haversineDistance(this.props.userLat, this.props.userLon, this.props.itemLat, this.props.itemLon))}
          mapUrl={generateMapLink(this.props.userLat, this.props.userLon, this.props.itemLat, this.props.itemLon)}
          views={this.props.views}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2 - 10,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

ItemCard.propTypes = {
  category: React.PropTypes.string,
  publishDate: React.PropTypes.object,
  navigator: React.PropTypes.node,
  title: React.PropTypes.string,
  streetName: React.PropTypes.string,
  cityName: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  itemLat: React.PropTypes.number,
  itemLon: React.PropTypes.number,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number,
  userImg: React.PropTypes.string,
  username: React.PropTypes.string,
  views: React.PropTypes.number
}
