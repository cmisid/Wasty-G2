import React, { Component } from 'react'
import { ListView, StyleSheet, View } from 'react-native'

import ItemRow from '../components/ItemRow'
import Container from '../components/Container'
import { getUserItems } from '../store/api'
import { colors } from '../style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class PostedScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      userItems: {},
      location: {'lat': 48.566140, 'lon': -3.148260}
    }
  }

  componentDidMount () {
    getUserItems()
      .then(userItems => { this.setState({userItems}) })
      .catch(() => {})
  }

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.state.userItems)}
          renderRow={userItem => (
            <ItemRow
              item={userItem}
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

PostedScene.propTypes = {
  userItems: React.PropTypes.array
}
