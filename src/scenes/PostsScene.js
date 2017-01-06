import React, { Component } from 'react'
import { ListView, StyleSheet, View, Text, RefreshControl } from 'react-native'

import Modal from 'react-native-modalbox'
import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
                if (item.status === 'pickedUp') {
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

        <Modal style={{borderRadius: 5, height: 200, paddingLeft: 5, paddingRight: 5}} ref={'modal'}>
          <Text
            style={{textAlign: 'center', marginLeft: 8, marginRight: 8, marginTop: 10}}
          >Thierry dit avoir récupéré votre {this.state.selectedItem.title}. Voulez-vous confirmer ?</Text>
          <ActionButton
            buttonColor={colors.primary}
            icon={<Icon color='white' name='check' size={20} />}
            onPress={() => Actions.searchPostItemScene()}
          />
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
