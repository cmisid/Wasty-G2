import React, { Component } from 'react'
import { View, StyleSheet, Linking, Text, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'

import AppText from '../AppText'
import ProgressiveImage from '../ProgressiveImage'
import { colors } from '../../style'

export default class CardFooter extends Component {

  _onPressUser () {
    console.log('Image pressed')
    Actions.searchUserScene({
      user: this.props.user
    })
  }

  render () {
    return (
      <View style={styles.publishMetadata}>

        <TouchableHighlight onPress={this._onPressUser.bind(this)} underlayColor={colors.transparent}>
          <View style={{marginTop: 13}}>
            <ProgressiveImage
              thumbnailSource={{ uri: this.props.user.imgPlaceholderUrl }}
              imageSource={{ uri: this.props.user.imgUrl }}
              style={styles.userImage}
            />
          </View>
        </TouchableHighlight>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <TouchableHighlight onPress={this._onPressUser.bind(this)} underlayColor={colors.transparent}>
            <View>
              <AppText style={StyleSheet.flatten(styles.publisher)}>
                {`${this.props.user.fullName}`}
              </AppText>
            </View>
          </TouchableHighlight>
          <Text
            style={StyleSheet.flatten(styles.streetName)}
            onPress={() => Linking.openURL(this.props.mapUrl)}
          >{`${this.props.address.streetName}, ${this.props.address.cityName}`}
          </Text>
          <AppText style={StyleSheet.flatten(styles.distance)}>
            {this.props.distance}
          </AppText>
        </View>
        <View style={{flex: 2, flexDirection: 'column', alignItems: 'flex-end'}}>
          <AppText style={StyleSheet.flatten(styles.date)}>
            {this.props.publishDate}
          </AppText>
          <View style={{flexDirection: 'row', marginRight: 5}}>
            <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color={colors.secondary} />
            <AppText> {this.props.views}</AppText>
          </View>
        </View>
      </View>
    )
  }
}

CardFooter.propTypes = {
  publishDate: React.PropTypes.string,
  streetName: React.PropTypes.string,
  cityName: React.PropTypes.string,
  distance: React.PropTypes.string,
  mapUrl: React.PropTypes.string,
  views: React.PropTypes.number,
  user: React.PropTypes.object
}

const styles = StyleSheet.create({
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
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15
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
