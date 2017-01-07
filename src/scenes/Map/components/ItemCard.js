import React, {Component} from 'react'
import { StyleSheet, Dimensions } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import CardFooter from '../../../components/card/CardFooter'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { distanceFmt, generateMapLink, haversineDistance } from '../../../util.js'

export default class ItemCard extends Component {

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
          user={this.props.item.publisher}
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

ItemCard.propTypes = {
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
