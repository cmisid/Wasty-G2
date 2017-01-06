import React, { Component } from 'react'
import { ListView, StyleSheet, View, Text, RefreshControl } from 'react-native'

import { isEmpty } from 'lodash'
import Modal from 'react-native-modalbox'
import { Actions } from 'react-native-router-flux'

import PostRow from '../components/PostRow'
import Container from '../components/Container'
import { getPosts } from '../store/api'
import { colors } from '../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class PostedScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedItem: {},
      refreshing: false,
      items: [],
      location: {'lat': 48.566140, 'lon': -3.148260}
    }
  }

  openModal () {
    this.refs.modal.open()
  }

  componentDidMount () {
    getPosts()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  _onRefresh () {
    this.setState({refreshing: true})
    getPosts()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false})
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <ListView
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={ds.cloneWithRows(this.state.items)}
          renderRow={item => (
            <PostRow
              item={item}
              onPressAction={() => {
                if (item.status === 'picked-up') {
                  this.setState({selectedItem: item}, () => this.openModal())
                } else Actions.postsItemScene({item})
              }}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections
        />

        <Modal style={{height: 200}} ref={'modal'}>
          <Text>{!isEmpty(this.state.selectedItem) ? this.state.selectedItem.title : 'Vide'}</Text>
        </Modal>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.accent
  }
})

PostedScene.propTypes = {
  userItems: React.PropTypes.array
}
