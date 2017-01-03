import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import AppText from './AppText'
import ProgressiveImage from './ProgressiveImage'
import { colors } from '../style'

export default class UserView extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <ProgressiveImage
              thumbnailSource={{ uri: this.props.user.imgPlaceholderUrl }}
              imageSource={{ uri: this.props.user.imgUrl }}
              style={styles.userImage}
            />
          </View>
          <View style={styles.headerDescription}>
            <AppText>{this.props.user.fullName}</AppText>
            <AppText style={{color: colors.background}}>
              {`Inscrit ${distanceInWordsToNow(
                this.props.user.joinDate,
                {locale: frLocale, addSuffix: true}
              )}`}
            </AppText>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerImage: {
    flex: 1
  },
  headerDescription: {
    alignItems: 'center',
    flex: 2,
    flexDirection: 'column'
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  wrapper: {
    padding: 20,
    flex: 1
  }
})

UserView.propTypes = {
  user: React.PropTypes.object
}
