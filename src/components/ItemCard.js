import React, {Component} from 'react'
import { Image, StyleSheet, View, Text, Linking, Dimensions } from 'react-native'

import Lightbox from 'react-native-lightbox'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import Card from './card/Card'
import AppText from './AppText'
import { colors } from '../style'

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
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText style={{marginLeft: 10, marginTop: 5}}>{this.props.title}</AppText>
          <AppText style={{marginLeft: 10, marginTop: 5, marginBottom: 5}}>{this.props.category}</AppText>
        </View>
        <Lightbox
          navigator={this.props.navigator}
          swipeToDismiss
        >
          <Image
            style={styles.image}
            source={{uri: this.props.imgUrl}}
          />
        </Lightbox>
        <View style={styles.publishMetadata}>
          <Image
            style={styles.userImage}
            resizeMode='contain'
            source={{uri: this.props.userImg}}
          />
          <View style={{flex: 2, flexDirection: 'column'}}>
            <AppText style={StyleSheet.flatten(styles.publisher)}>
              {this.props.username}
            </AppText>
            <AppText
              style={StyleSheet.flatten(styles.streetName)}
              onPress={() => Linking.openURL(generateMapLink(
                this.props.userLat,
                this.props.userLon,
                this.props.itemLat,
                this.props.itemLon
              ))}
            >{`${this.props.streetName}, ${this.props.cityName}`}
            </AppText>
            <AppText style={StyleSheet.flatten(styles.distance)}>
              {distanceFmt(haversineDistance(this.props.userLat, this.props.userLon, this.props.itemLat, this.props.itemLon))}
            </AppText>
          </View>
          <AppText style={StyleSheet.flatten(styles.date)}>
            {distanceInWordsToNow(this.props.publishDate, {locale: frLocale, addSuffix: true})}
          </AppText>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10
  },
  publishMetadata: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10
  },
  publisher: {
    marginTop: 10,
    marginLeft: 5
  },
  streetName: {
    marginLeft: 5,
    color: colors.link
  },
  image: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2 - 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  userImage: {
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 13
  },
  distance: {
    fontStyle: 'italic',
    marginLeft: 5,
    color: colors.background
  },
  date: {
    marginTop: 10,
    marginRight: 5,
    color: colors.background
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
  username: React.PropTypes.string
}
