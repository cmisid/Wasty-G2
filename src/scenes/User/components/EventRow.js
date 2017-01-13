/* This component is dedicated to the historic on the user scene */
import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'

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
        {/* Description clikable of the object to access the detailled description */}
        <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
          <TouchableHighlight onPress={() => Actions.accountItemScene({item: this.props.event.item})}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ProgressiveImage
                thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
                imageSource={{ uri: this.props.event.item.imgUrl }}
                style={styles.image}
              />
              <AppText style={{marginTop: 3}}>
                {`${this.props.event.item.title}`}
              </AppText>
            </View>
          </TouchableHighlight>
        </View>

        {/* Symbol and description depending on the transaction state (posté, récupéré de, récupéré par) */}
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

        {/* Image and description (clickable) of the user the transaction is with, depending of the transaction status */}
        {this.props.event.action === 'post' && this.props.event.item.status === 'FINISHED' &&
        <View style={{alignItems: 'center', flex: 2}}>
          <TouchableHighlight onPress={() => Actions.accountUserScene({user: this.props.event.item.picker})}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ProgressiveImage
                thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
                imageSource={{ uri: this.props.event.item.picker.imgUrl }}
                style={styles.image}
              />
              <AppText>
                {`${this.props.event.item.picker.firstName} ${this.props.event.item.picker.lastName}`}
              </AppText>
            </View>
          </TouchableHighlight>
        </View>
        }

        {this.props.event.action === 'post' && this.props.event.item.status !== 'FINISHED' &&
        <View style={{alignItems: 'center', flex: 2}} />
        }

        {this.props.event.action === 'recover' &&
        <View style={{alignItems: 'center', flex: 2}}>
          <TouchableHighlight onPress={() => Actions.accountUserScene({user: this.props.event.item.publisher})}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ProgressiveImage
                thumbnailSource={{ uri: this.props.event.item.imgPlaceholderUrl }}
                imageSource={{ uri: this.props.event.item.publisher.imgUrl }}
                style={styles.image}
              />
              <AppText>
                {`${this.props.event.item.publisher.firstName} ${this.props.event.item.publisher.lastName}`}
              </AppText>
            </View>
          </TouchableHighlight>

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
