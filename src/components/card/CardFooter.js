import React, { Component } from 'react'
import { View, Image, StyleSheet, Linking, Text } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../AppText'
import { colors } from '../../style'

export default class CardFooter extends Component {
  render () {
    return (
      <View style={styles.publishMetadata}>
        <Image
          style={styles.userImage}
          resizeMode='contain'
          source={{uri: this.props.userImg}}
        />
        <View style={styles.wrapper}>
          <AppText style={StyleSheet.flatten(styles.publisher)}>{this.props.username}</AppText>
          <Text
            style={StyleSheet.flatten(styles.streetName)}
            onPress={() => Linking.openURL(this.props.mapUrl)}
          >{`${this.props.streetName}, ${this.props.cityName}`}
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
            <AppText>{this.props.views}</AppText>
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
  userImg: React.PropTypes.string,
  username: React.PropTypes.string,
  distance: React.PropTypes.string,
  mapUrl: React.PropTypes.string,
  views: React.PropTypes.number
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
