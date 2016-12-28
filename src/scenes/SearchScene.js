import React, { Component } from 'react'
import { AsyncStorage, ListView, StyleSheet } from 'react-native'

import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AddItemModal from '../components/AddItemModal'
import Container from '../components/Container'
import ItemCard from '../components/ItemCard'
import { colors } from '../style'
import { getItems } from '../store/api'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class ItemScene extends Component {

  constructor (props) {
    super(props)
    this.state = {
      items: {},
      location: {'lat': 48.566140, 'lon': -3.148260}
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

  render () {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.state.items)}
          renderRow={item => (
            <ItemCard
              item={item}
              userLat={this.state.location.lat}
              userLon={this.state.location.lon}
            />
          )}
          enableEmptySections
        />

        <AddItemModal
          onConfirm={this.props.postItem}
          ref={'postItemModal'}
        />

        <ActionButton
          buttonColor={colors.primary}
          icon={<Icon color='white' name='add' size={24} />}
          onPress={() => this.refs.postItemModal.openModal()}
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
