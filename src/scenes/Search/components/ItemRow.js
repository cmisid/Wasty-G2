import React, {Component} from 'react'

import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Swipeout from 'react-native-swipeout'
import Toast from 'react-native-root-toast'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import CardHeader from '../../../components/card/CardHeader'
import CardFooter from '../../../components/card/CardFooter'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { distanceFmt, generateMapLink, haversineDistance } from '../../../util'
import { colors } from '../../../style'

const toast = text => Toast.show(text, {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 500,
  backgroundColor: colors.primary,
  shadowColor: colors.background,
  textColor: 'white'
})

export default class ItemCard extends Component {

  constructor (props) {
    super(props)
    this.likeButton = [
      {
        text: <Icon name='favorite-border' iconStyle={{marginTop: 10}} size={30} color='white' />,
        backgroundColor: 'orange',
        color: 'white',
        underlayColor: 'orange',
        onPress: () => this.onLeftSwipeoutPressed()
      }
    ]
  }

  onLeftSwipeoutPressed () {
    toast(<AppText style={StyleSheet.flatten(styles.toast)}>{`"${this.props.item.title}" a été ajouté à votre liste d'items`}</AppText>)
    this.props.onLikedItem(this.props.item.id)
  }

  render () {
    return (
      <Swipeout
        right={this.likeButton}
        autoClose
        sensitivity={0.9}
      >
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
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  toast: {
    fontWeight: 'bold'
  },
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
  userLon: React.PropTypes.number,
  onLikedItem: React.PropTypes.func
}
