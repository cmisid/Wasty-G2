import React, { Component } from 'react'
import { AsyncStorage, ListView, Platform, ScrollView, StyleSheet, RefreshControl, View } from 'react-native'

import ActionButton from 'react-native-action-button'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNFetchBlob from 'react-native-fetch-blob'
import { forEach, reject } from 'lodash'

import Container from '../../components/Container'
import ItemRow from './components/ItemRow'
import LoadMoreButton from '../../components/LoadMoreButton'
import Separator from '../../components/Separator'
import Tag from './components/Tag'
import { getItems } from '../../data/api'
import { types } from '../../data/constants'
import { colors } from '../../style'
import { WEB_SERVICES_URLS } from '../../config'
import { colorLuminance } from '../../util'

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
    // Load items to display initially
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  typeTags () {
    const tags = [] // Store the markup for the tags in an array
    const n = Object.keys(types).length
    let i = 0 // Increment a counter to determine the luminance
    forEach(types, (value, key) => {
      // Override the default tag style with a color
      const style = {
        borderRadius: 5,
        padding: 5,
        marginRight: 6,
        flex: 1,
        backgroundColor: colorLuminance(colors.secondary, i / n)
      }
      tags.push(<Tag key={key} style={style} text={value} />)
      i = i + 1
    })
    return tags
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
      cameraType: 'back',
      mediaType: 'photo',
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

        // this.postImage(response)
        this.setState({
          itemImgSource: source
        })
        Actions.searchItemPostScene({itemImgSource: this.state.itemImgSource})
      }
    })
  }

  postImage (imgPickerResponse) {
    // FIXME: we are unable to connect to API server
    const endpoint = `${WEB_SERVICES_URLS.IMG_CLASSIFIER_URL}/upload_image/`
    console.log(endpoint)
    RNFetchBlob.fetch('POST', endpoint, {
      'Content-Type': 'application/octet-stream'
    }, RNFetchBlob.wrap(`file://${imgPickerResponse.uri}`))
    .then(res => {
      console.log(res.text())
    })
    .catch(err => {
      console.log(err)
    })
  }

  likeItem (id) {
    const listWithoutItem = reject(this.state.items, {id: id})
    this.setState({items: listWithoutItem})
  }

  refreshItems () {
    this.setState({refreshing: true})
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false})
  }

  loadMoreItems () {
    // TODO: implémenter la logique de récupération des données via l'API (avec pagination)
    // Ici on a fait un exemple basique d'ajout d'item dans la liste)]
    const items = this.state.items
    items.push(items[Math.floor(Math.random() * items.length)])
    this.setState({items})
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>

        {/* List of categories the user can click on */}
        <View style={styles.top}>
          <ScrollView style={styles.tagScroll} horizontal showsHorizontalScrollIndicator={false}>
            {this.typeTags()}
          </ScrollView>
        </View>

        <View style={styles.bottom}>
          {/* A ScrollView is necessary to put a "Load more" button under the list of items */}
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshItems.bind(this)}
              />
            }
            showsVerticalScrollIndicator={false}
          >

            {/* List of items */}
            <ListView
              dataSource={ds.cloneWithRows(this.state.items)}
              enableEmptySections
              renderRow={item => (
                <ItemRow
                  item={item}
                  onLikeItem={this.likeItem.bind(this)}
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

            {/* Load more button */}
            <LoadMoreButton
              iconColor='white'
              onPress={this.loadMoreItems.bind(this)}
            />

          </ScrollView>
        </View>

        {/* Take picture button */}
        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='photo-camera' size={20} />}
          onPress={() => this.selectPhotoTapped()}
        />

      </Container>
    )
  }
}

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
  }
})

SearchScene.propTypes = {
  postItem: React.PropTypes.func,
  items: React.PropTypes.array
}
