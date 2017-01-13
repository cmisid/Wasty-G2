/* This is the user scene */
import React, { Component } from 'react'
import { ListView, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

import EventRow from './components/EventRow'
import AppText from '../../components/AppText'
import Container from '../../components/Container'
import LoadMoreButton from '../../components/LoadMoreButton'

import ProgressiveImage from '../../components/ProgressiveImage'
import { getEvents, getUser } from '../../data/api'
import { colors } from '../../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class UserScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      events: [],
      items: {},
      refreshing: false
    }
  }

  componentWillMount () {
    getUser()
      .then(user => { this.setState({user}) })
      .catch(() => { this.setState({user: {}}) })

    getEvents()
      .then(events => { this.setState({events}) })
      .catch(() => { this.setState({events: []}) })
  }

  refreshEvents () {
    this.setState({refreshing: true})
    getEvents()
      .then(events => { this.setState({events}) })
      .catch(() => this.setState({events: []}))
    this.setState({refreshing: false})
  }

  loadMoreEvents () {
    const events = this.state.events
    events.push(events[Math.floor(Math.random() * events.length)])
    this.setState({events})
  }

  render () {
    return (
      <Container>
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
                  {`Inscrit ${this.props.user.readableInscriptionSince}`}
                </AppText>
              </View>
            </View>
          </View>

          {/* Timeline block which contains the user's activity log */}
          <View style={styles.bottom}>
            {/* A ScrollView is necessary to put a "Load more" button under the list of events */}
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshEvents.bind(this)}
                />
              }
              showsVerticalScrollIndicator={false}
            >

              {/* List of events */}
              <ListView
                dataSource={ds.cloneWithRows(this.state.events)}
                enableEmptySections
                renderRow={event => <EventRow event={event} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                style={styles.timeline}
              />

              {/* Load more button */}
              <View style={{marginTop: 6}}>
                <LoadMoreButton
                  iconColor={colors.lightBackground}
                  onPress={this.loadMoreEvents.bind(this)}
                />
              </View>

            </ScrollView>
          </View>

        </View>
      </Container>
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
    flexDirection: 'column',
    alignSelf: 'center'
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
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1
  }
})

UserScene.propTypes = {
  user: React.PropTypes.object
}
