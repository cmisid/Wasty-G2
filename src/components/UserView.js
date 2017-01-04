import React, { Component } from 'react'
import { ListView, StyleSheet, View } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import AppText from './AppText'
import EventRow from './EventRow'
import ProgressiveImage from './ProgressiveImage'
import { colors } from '../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class UserView extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        {/* Header block which contains the user's information */}
        <View style={styles.top}>
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
        {/* Timeline block which contains the user's activity log */}
        <View style={styles.bottom}>
          <ListView
            dataSource={ds.cloneWithRows(this.props.events)}
            enableEmptySections
            renderRow={event => <EventRow event={event} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            style={styles.timeline}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 1
  },
  bottom: {
    flex: 3
  },
  header: {
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
  timeline: {
    flex: 5
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.background
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
  events: React.PropTypes.array,
  user: React.PropTypes.object
}
