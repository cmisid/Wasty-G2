import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { Actions, Router, Scene } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../../../components/AppText'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { colors } from '../../../style'

export default class EventRow extends Component {

constructor (props) {
    super(props)
    this.state = {
      event: {},
      location: {
        'lat': 48.566140,
        'lon': -3.148260
      }
    }
  }

  render () {
    return (
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.event.item.imgUrl }}
            style={styles.image}
          />
        </View>
        <View style={{flex: 5}}>
          <Text onPress={() => Actions.accountItemScene({item: this.props.event.item,
                                                         userLat: this.state.location.lat,
                                                         userLon: this.state.location.lon})}>
            {`"${this.props.event.item.title}" ${this.props.event.action === 'post' ? 'posté' : 'récupéré'} ${distanceInWordsToNow(
                  this.props.event.date,
                  {locale: frLocale, addSuffix: true}
            )}`}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <Icon
            name={this.props.event.action === 'post' ? 'arrow-forward' : 'arrow-back'}
            size={30}
            color={colors.secondary}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
})