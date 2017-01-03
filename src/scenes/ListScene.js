import React, { Component } from 'react'
import { ListView, StyleSheet, View } from 'react-native'

import ItemRow from '../components/ItemRow'
import Container from '../components/Container'

import { getItems } from '../store/api'
import { colors } from '../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class ListScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      items: [],
      location: {
        lat: 48.566140,
        lon: -3.148260
      }
    }
  }

  componentDidMount () {
    getItems()
      .then(items => { this.setState({items}) })
      .catch(() => {})
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.state.items)}
          renderRow={item => (
            <ItemRow
              item={item}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections
        />
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
