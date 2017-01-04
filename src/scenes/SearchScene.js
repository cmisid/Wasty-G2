import React, { Component } from 'react'
import { AsyncStorage, ListView, Platform, StyleSheet, RefreshControl } from 'react-native'

import ActionButton from 'react-native-action-button'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Container from '../components/Container'
import ItemCard from '../components/ItemCard'
import { colors } from '../style'
import { getItems } from '../store/api'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class ItemScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      items: {},
      location: {'lat': 48.566140, 'lon': -3.148260},

      avatarSource: null,
      videoSource: null
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
          avatarSource: source
        })
      }
    })
  }

    _onRefresh() {
    this.setState({refreshing: true});
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false});
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
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
            <ItemCard
              item={item}
              onPressAction={() => Actions.searchItemScene({item})}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          style={styles.list}
        />

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
  list: {
    flex: 1
  }
})

ItemScene.propTypes = {
  postItem: React.PropTypes.func,
  items: React.PropTypes.array
}
