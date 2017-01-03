import React, { Component } from 'react'
import { View, StyleSheet, Linking, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import ProgressiveImage from './ProgressiveImage'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import AppText from './AppText'
import Card from './card/Card'
import { colors } from '../style'

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

export default class ItemRow extends Component {
  render () {
    return (
      <TouchableHighlight onPress={this.props.onPressAction}>
        <View style={{flex: 1}}>
          <Card>
            <View
              style={styles.row}
            >
              <ProgressiveImage
                thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
                imageSource={{ uri: this.props.item.imgUrl }}
                style={styles.image}
              />
              <View
                style={{flex: 2, marginLeft: 5}}
              >
                <AppText
                  style={StyleSheet.flatten(styles.title)}
                >
                  {this.props.item.title}
                </AppText>
                <AppText
                  style={StyleSheet.flatten(styles.category)}
                >
                  {this.props.item.category}
                </AppText>
                <View
                  style={styles.content}
                >
                  <AppText
                    style={StyleSheet.flatten(styles.streetName)}
                    onPress={() => Linking.openURL(generateMapLink(
                      this.props.userLat,
                      this.props.userLon,
                      this.props.item.lat,
                      this.props.item.lon
                    ))}
                  >{`${this.props.item.streetName}, ${this.props.item.cityName}`}
                  </AppText>

                  <AppText style={StyleSheet.flatten(styles.distance)}>
                    {distanceFmt(haversineDistance(
                      this.props.userLat,
                      this.props.userLon,
                      this.props.item.lat,
                      this.props.item.lon
                    ))}
                  </AppText>
                </View>
                <View
                  style={styles.content}
                >
                  <AppText>
                    {distanceInWordsToNow(
                      this.props.item.publishDate,
                      {locale: frLocale, addSuffix: true}
                    )}
                  </AppText>
                  <View style={{flexDirection: 'row', marginRight: 5}}>
                    <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color={colors.secondary} />
                    <AppText> {this.props.item.nViews}</AppText>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </TouchableHighlight>
    )
  }
}

ItemRow.propTypes = {
  item: React.PropTypes.object,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  category: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'red'
  },
  image: {
    width: 100 - 10,
    height: 100 - 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  title: {
    marginLeft: 10,
    marginTop: 10
  },
  streetName: {
    color: colors.link
  },
  distance: {
    fontStyle: 'italic',
    color: colors.background,
    marginRight: 5
  }
})
