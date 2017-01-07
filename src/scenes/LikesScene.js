import React, { Component } from 'react'
import { ListView, StyleSheet, RefreshControl } from 'react-native'

import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import ItemRowSwipe from '../components/ItemRowSwipe'
import Container from '../components/Container'
import Separator from '../components/Separator'
import { getLikes } from '../store/api'
import { colors } from '../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class ListScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      items: [],
      location: {
        lat: 48.566140,
        lon: -3.148260
      }
    }
  }

  _onRefresh () {
    this.setState({refreshing: true})
    getLikes()
      .then(items => { this.setState({items}) })
      .catch(() => {})
    this.setState({refreshing: false})
  }

  onDeleteItem (id) {
    const listWithoutItem = _.reject(this.state.items, {id: id})
    console.log(id, listWithoutItem)
    this.setState({items: listWithoutItem})
  }

  componentDidMount () {
    getLikes()
      .then(items => { this.setState({items}) })
      .catch(() => {})
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
            <ItemRowSwipe
              item={item}
              onDeleteItem={this.onDeleteItem.bind(this)}
              onPressAction={() => Actions.likesItemScene({item: item,
                userLat: this.state.location.lat,
                userLon: this.state.location.lon})}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          renderSeparator={(sectionId, rowId) => <Separator key={rowId} />}
          enableEmptySections
        />

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
