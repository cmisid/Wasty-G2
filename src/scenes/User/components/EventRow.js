import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../../../components/AppText'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { colors } from '../../../style'

export default class EventRow extends Component {
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
          <AppText onPress={() => Actions.accountItemScene({item: this.props.event.item})}>
            {`"${this.props.event.item.title}" ${this.props.event.action === 'post' ? 'posté' : 'récupéré'} ${distanceInWordsToNow(
                  this.props.event.date,
                  {locale: frLocale, addSuffix: true}
                )}`}
          </AppText>
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
