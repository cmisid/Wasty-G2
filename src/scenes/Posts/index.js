import React, { Component } from 'react'
import { ListView, StyleSheet, View, Text, RefreshControl, Dimensions } from 'react-native'

import Modal from 'react-native-modalbox'
import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ItemRow from './components/ItemRow'
import Container from '../../components/Container'
import Separator from '../../components/Separator'
import { getPosts } from '../../data/api'
import { colors } from '../../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
const width = Dimensions.get('window').width - 30

export default class PostsScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedItem: {},
      refreshing: false,
      items: [],
      location: {
        'lat': 48.566140,
        'lon': -3.148260
      }
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
            <ItemRow
              item={item}
              onPressAction={() => {
                if (item.status === 'PICKEDUP') {
                  this.setState({selectedItem: item}, () => this.openModal())
                } else {
                  Actions.postsItemScene({
                    item: item,
                    userLat: this.state.location.lat,
                    userLon: this.state.location.lon
                  })
                }
              }}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          renderSeparator={(sectionId, rowId) => <Separator key={rowId} />}
          enableEmptySections
        />

        <Modal style={{height: 180, borderRadius: 5, width: width}} color={'blue'} ref={'modal'} backdropColor={'black'} backdropOpacity={0.3}>

          <Text
            style={{textAlign: 'center', marginLeft: 8, marginRight: 8, marginTop: 10}}
          >{`Thierry dit avoir récupéré :`}</Text>
          <Text
            style={{textAlign: 'center', marginLeft: 8, marginRight: 8, marginTop: 0, color: colors.link}}
            onPress={() => Actions.postsItemScene({item: this.state.selectedItem})}
          >{`${this.state.selectedItem.title}`}</Text>
          <Text
            style={{textAlign: 'center', marginLeft: 8, marginRight: 8, marginTop: 10, fontWeight: 'bold'}}
          >{`Voulez-vous confirmer ?`}</Text>
          <View style={{position: 'absolute', marginTop: 105, marginLeft: 260}}>
            <ActionButton
              buttonColor={colors.primary}
              icon={<Icon color='white' name='check' size={20} />}
              onPress={() => Actions.searchItemPostScene()}
            />
          </View>
          <View style={{position: 'absolute', marginTop: 105, marginLeft: 120}}>
            <ActionButton
              buttonColor={'crimson'}
              icon={<Icon color='white' name='clear' size={20} />}
              onPress={() => Actions.searchItemPostScene()}
            />
          </View>
        </Modal>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 7
  }
})

PostsScene.propTypes = {
  userItems: React.PropTypes.array
}
