import React, {Component} from 'react'

import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import ProgressiveImage from './ProgressiveImage'

import Card from './card/Card'
import CardHeader from './card/CardHeader'
import CardFooter from './card/CardFooter'

import { generateMapLink, haversineDistance, distanceFmt } from './../util.js'

export default class ItemCard extends Component {
  render () {
    return (
      <TouchableHighlight onPress={this.props.onPressAction}>
        <View style={{flex: 1}}>
          <Card>

            <CardHeader
              title={this.props.item.title}
              category={this.props.item.category}
            />

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
              address={this.props.item.address}
              user={this.props.item.publisher}
              distance={distanceFmt(haversineDistance(
                this.props.userLat,
                this.props.userLon,
                this.props.item.address.lat,
                this.props.item.address.lon
              ))}
              mapUrl={generateMapLink(
                this.props.userLat,
                this.props.userLon,
                this.props.item.address.lat,
                this.props.item.address.lon
              )}
              views={this.props.item.nViews}
            />
          </Card>
        </View>
      </TouchableHighlight>
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
  item: React.PropTypes.object,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}
