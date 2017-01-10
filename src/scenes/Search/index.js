import React, { Component } from 'react'
import { AsyncStorage, ListView, Platform, ScrollView, StyleSheet, RefreshControl, View, TouchableOpacity } from 'react-native'

import ActionButton from 'react-native-action-button'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'

import ItemRow from './components/ItemRow'
import Tag from './components/Tag'
import Container from '../../components/Container'
import Separator from '../../components/Separator'
import { getItems } from '../../data/api'
import { colors } from '../../style'
import { randPastelColor } from '../../util'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class SearchScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      items: [],
      location: {
        'lat': 48.566140,
        'lon': -3.148260
      },
      itemImgSource: {}
    }
  }

  componentDidMount () {
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  postItem (item) {
    const items = this.state.items.concat(item)
    this.setState({items})
    AsyncStorage.setItem('items', JSON.stringify(items))
  }

  selectPhotoTapped () {
    const options = {
      title: 'Poster un objet',
      cancelButtonTitle: 'Annuler',
      takePhotoButtonTitle: 'Prendre une photo',
      chooseFromLibraryButtonTitle: 'Choisir une photo existante',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = Platform.OS === 'android'
          ? {uri: response.uri, isStatic: true}
          : {uri: response.uri.replace('file://', ''), isStatic: true}

        this.setState({
          itemImgSource: source
        })
        Actions.searchItemPostScene({itemImgSource: this.state.itemImgSource})
      }
    })
  }

  onLikeItem (id) {
    const listWithoutItem = _.reject(this.state.items, {id: id})
    console.log(id, listWithoutItem)
    this.setState({items: listWithoutItem})
  }

  _onRefresh () {
    this.setState({refreshing: true})
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false})
  }

  _showMoreItems () {
    // TODO: implémenter la logique de récupération des données via l'API (avec pagination)
    // Ici on a fait un exemple basique d'ajout d'item dans la liste
    const newItem = {Item: this.state.items[1]}
    this.setState({
      items: Object.assign(this.state.items, newItem)
    })
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <View style={styles.top}>
          <ScrollView style={styles.tagScroll} horizontal>
            <Tag style={tagStyle()} text='Chaise' onPress={() => console.log('Chaise')} />
            <Tag style={tagStyle()} text='Bureau' onPress={() => console.log('Bureau')} />
            <Tag style={tagStyle()} text='Crêpière' onPress={() => console.log('Crêpière')} />
            <Tag style={tagStyle()} text='Friteuse' onPress={() => console.log('Friteuse')} />
            <Tag style={tagStyle()} text='Habits' onPress={() => console.log('Habits')} />
            <Tag style={tagStyle()} text='Verre' onPress={() => console.log('Verre')} />
            <Tag style={tagStyle()} text='Carton' onPress={() => console.log('Carton')} />
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            dataSource={ds.cloneWithRows(this.state.items)}
            enableEmptySections
            renderRow={item => (
              <ItemRow
                item={item}
                onLikeItem={this.onLikeItem.bind(this)}
                onPressAction={() => Actions.searchItemScene({
                  item: item,
                  userLat: this.state.location.lat,
                  userLon: this.state.location.lon
                })}
                userLat={this.state.location.lat}
                userLon={this.state.location.lon}
              />
            )}
            renderSeparator={(sectionId, rowId) => <Separator key={rowId} />}
            style={styles.list}
          />
        </View>
        <View style={styles.buttonFooter}>
          <TouchableOpacity onPress={this._showMoreItems.bind(this)} style={styles.moreItemsButton} activeOpacity={0}>
            <Icon color='white' name='add-circle' size={40} />
          </TouchableOpacity>
        </View>
        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='photo-camera' size={20} />}
          onPress={() => this.selectPhotoTapped()}
        />
      </Container>
    )
  }
}

// The tag style is dynamic because it should have a random pastel color
const tagStyle = () => ({
  borderRadius: 5,
  padding: 5,
  marginRight: 6,
  backgroundColor: randPastelColor(),
  flex: 1
})

const styles = StyleSheet.create({
  tagScroll: {
    flex: 1,
    padding: 5,
    marginBottom: 5,
    paddingBottom: 0,
    paddingTop: 7
  },
  list: {
    flex: 1
  },
  top: {
    flex: 1
  },
  bottom: {
    flex: 12
  },
  moreItemsButton: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  buttonFooter: {
    alignSelf: 'center',
    height: 0 // FIXME
  }
})

SearchScene.propTypes = {
  postItem: React.PropTypes.func,
  items: React.PropTypes.array
}
