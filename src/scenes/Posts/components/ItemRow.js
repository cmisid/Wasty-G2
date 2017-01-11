import React, { Component } from 'react'
import { TouchableHighlight, View } from 'react-native'

import { Actions } from 'react-native-router-flux'
import Swipeout from 'react-native-swipeout'

import ItemRowContent from './ItemRowContent'
import { colors } from '../../../style'

export default class ItemRow extends Component {

  constructor (props) {
    super(props)
    this.state = {
      deleteButton: [
        {
          text: 'Supprimer',
          backgroundColor: 'lightcoral',
          color: 'white',
          underlayColor: 'dimgray',
          onPress: () => this.props.onDeleteItem(this.props.item.id)
        }
      ]
    }
  }

  render () {
    if (this.props.item.status === 'PICKEDUP') {
      return (
        <TouchableHighlight onPress={() => this.props.onSelectItem(this.props.item)}>
          <View>
            <ItemRowContent item={this.props.item} />
          </View>
        </TouchableHighlight>
      )
    } else if (this.props.item.status === 'FINISHED') {
      return (
        <TouchableHighlight onPress={() => Actions.postsItemScene({item: this.props.item})}>
          <View>
            <ItemRowContent item={this.props.item} />
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <Swipeout
          right={this.state.deleteButton}
          autoClose
          sensitivity={0.9}
          style={{backgroundColor: colors.background}}
        >
          <TouchableHighlight onPress={() => Actions.postsItemScene({
            item: this.props.item
          })}>
            <View>
              <ItemRowContent item={this.props.item} />
            </View>
          </TouchableHighlight>
        </Swipeout>
      )
    }
  }
}

ItemRow.propTypes = {
  item: React.PropTypes.object,
  onDeleteItem: React.PropTypes.func,
  onSelectItem: React.PropTypes.func,
  location: React.PropTypes.object
}
