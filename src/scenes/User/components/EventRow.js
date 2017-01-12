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
      /* One line of the Hystoric */
      <View style={styles.row}>
        {/* The picture of the object */}
        <View style={{flex: 2, flexDirection: 'column', alignItems: 'center'}} >
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.event.item.imgUrl }}
            style={styles.image}
          />
          <AppText onPress={() => Actions.accountItemScene({item: this.props.event.item})}>
            {`${this.props.event.item.title}`}
          </AppText>
        </View>

        {/* Description clikable of the object to access the detailled description */}
        <View style={{flex: 5, alignItems: 'center'}}>
          <AppText >
            {` ${this.props.event.action === 'post' && this.props.event.item.status === 'FINISHED' ? 'récupéré par' : `${this.props.event.action === 'post' ? 'posté' : 'récupéré de'}`}`}
          </AppText>
          <Icon
            name={this.props.event.action === 'post' && this.props.event.item.status === 'FINISHED' ? 'arrow-forward' : `${this.props.event.action === 'post' ? 'hourglass-empty' : 'arrow-back'}`}
            size={30}
            color={this.props.event.action === 'post' ? `${colors.primary}` : `${colors.accent}`}
          />
          <AppText onPress={() => Actions.accountItemScene({item: this.props.event.item})}>
            {`${distanceInWordsToNow(
                  this.props.event.date,
                  {locale: frLocale, addSuffix: true}
                )}`}
          </AppText>
        </View>

        {/* Arrow to indicate if you post or picked-up the object */}
        {this.props.event.action === 'post' && this.props.event.item.status === 'FINISHED' &&
        <View style={{alignItems: 'center', flex: 2}}>
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.event.item.picker.imgUrl }}
            style={styles.image}
            onPress={() => Actions.accountItemScene({item: this.props.event.item})}
          />
          <AppText onPress={() => Actions.accountItemScene({item: this.props.event.item})}>
            {`${this.props.event.item.picker.firstName} ${this.props.event.item.picker.lastName}`}
          </AppText>
        </View>
        }

        {this.props.event.action === 'post' && this.props.event.item.status !== 'FINISHED' &&
        <View style={{alignItems: 'center', flex: 2}}>
        </View>
        }

        {this.props.event.action === 'recover' &&
        <View style={{alignItems: 'center', flex: 2}}>
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.event.item.publisher.imgUrl }}
            style={styles.image}
          />
          <AppText onPress={() => Actions.accountItemScene({item: this.props.event.item})}>
            {`${this.props.event.item.publisher.firstName} ${this.props.event.item.publisher.lastName}`}
          </AppText>
        </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    height: 110,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15
  }
})
