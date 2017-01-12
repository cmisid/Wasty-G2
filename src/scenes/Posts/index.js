/* There are three documents. ItemRowContent is the style of Post. ItemRow contains older logics.
ItemRowContent and ItemRow are the childs of these Index.js. */

import React, { Component } from 'react'
import { ListView, ScrollView, StyleSheet, View, RefreshControl, Dimensions, TouchableHighlight } from 'react-native'
import ProgressiveImage from '../../components/ProgressiveImage'
import Modal from 'react-native-modalbox'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'

import ItemRow from './components/ItemRow'
import AppText from '../../components/AppText'
import Container from '../../components/Container'
import LoadMoreButton from '../../components/LoadMoreButton'
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
      },
      deleteButton: [
        {
          text: 'Supprimer',
          backgroundColor: 'lightcoral',
          color: 'white',
          underlayColor: 'dimgray',
          onPress: () => this.onDeleteItem(this.props.selectedItem.id)
        }
      ]
    }
  }

  setItemStatus (item, status) {
    const index = _.findIndex(this.state.items, i => i.id === item.id)
    const items = this.state.items
    items[index].status = status
    this.setState({items: items})
  }

  onDeleteItem (id) {
    const listWithoutItem = _.reject(this.state.items, {id: id})
    this.setState({items: listWithoutItem})
  }

  onSelectItem (item) {
    this.setState({selectedItem: item}, () => this.openModal())
  }

  openModal () {
    this.refs.modal.open()
  }

  closeModal () {
    this.refs.modal.close()
  }

  componentDidMount () {
    getPosts()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  refreshItems () {
    this.setState({refreshing: true})
    getPosts()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false})
  }

  loadMoreItems () {
    const items = this.state.items
    items.push(items[Math.floor(Math.random() * items.length)])
    this.setState({items})
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>

        {/* A ScrollView is necessary to put a "Load more" button under the list of posted items */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshItems.bind(this)}
            />
          }
          showsVerticalScrollIndicator={false}
        >

          {/* List of posted items */}
          <ListView
            style={styles.list}
            dataSource={ds.cloneWithRows(this.state.items)}
            renderRow={item => <ItemRow
              item={item}
              onDeleteItem={this.onDeleteItem.bind(this)}
              onSelectItem={this.onSelectItem.bind(this)}
              location={this.state.location}
            />}
            renderSeparator={(sectionId, rowId) => <Separator key={rowId} />}
            enableEmptySections
          />

          {/* Load more button */}
          <View style={{marginTop: 6}}>
            <LoadMoreButton
              iconColor='white'
              onPress={this.loadMoreItems.bind(this)}
            />
          </View>

        </ScrollView>

        {/* Modal window for confirming if an item was picked up or not */}
        {this.state.selectedItem.picker &&
        <Modal
          style={{height: 300, borderRadius: 5, width: width}}
          color={'blue'} ref={'modal'}
          backdropColor={'black'}
          backdropOpacity={0.3}
        >

          <View style={{flex: 5, flexDirection: 'row'}}>

            {/* View for user */}
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight onPress={() => Actions.postsUserScene({user: this.state.selectedItem.picker})}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ProgressiveImage
                    thumbnailSource={{ uri: this.state.selectedItem.picker.imgPlaceholderUrl }}
                    imageSource={{ uri: this.state.selectedItem.picker.imgUrl }}
                    style={{width: 85, height: 85, borderRadius: 40}}
                  />
                  <AppText style={{fontSize: 14, marginTop: 5}}>{this.state.selectedItem.picker.firstName}</AppText>
                  <AppText style={{fontSize: 14}}>{this.state.selectedItem.picker.lastName}</AppText>
                </View>
              </TouchableHighlight>
            </View>

            {/* Icon */}
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='hand-o-right' size={45} color={colors.background} />
            </View>

            {/* View for the item */}
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight onPress={() => Actions.postsItemScene({item: this.state.selectedItem, userLat: this.state.location.lat, userLon: this.state.location.lon})}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ProgressiveImage
                    thumbnailSource={{ uri: this.state.selectedItem.imgUrl }}
                    imageSource={{ uri: this.state.selectedItem.imgUrl }}
                    style={{width: 85, height: 85, borderRadius: 40}}
                  />
                  <AppText
                    style={{textAlign: 'center', marginTop: 5, fontSize: 14}}
                  >{`${this.state.selectedItem.title}`}</AppText>
                  <AppText style={{textAlign: 'center', fontSize: 14}}>{this.state.selectedItem.category}</AppText>
                </View>
              </TouchableHighlight>
            </View>

          </View>

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AppText
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}
            >
              Voulez-vous confirmer ?
            </AppText>
          </View>

          <View style={{flex: 3, flexDirection: 'row'}}>

            {/* View for confirm */}
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Icon.Button name='check' size={70} color='darkgreen' backgroundColor='white' onPress={() => {
                this.setItemStatus(this.state.selectedItem, 'FINISHED')
                this.closeModal()
              }} />
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Icon.Button name='remove' size={70} color='crimson' backgroundColor='white' onPress={() => {
                this.setItemStatus(this.state.selectedItem, 'PENDING')
                this.closeModal()
              }} />
            </View>
          </View>

        </Modal>
      }
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
