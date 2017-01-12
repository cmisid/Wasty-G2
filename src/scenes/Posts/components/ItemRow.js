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

/* Different displays depending of the status */
  render () {
    if (this.props.item.status === 'PICKEDUP') {
      return (
        <TouchableHighlight onPress={() => this.props.onSelectItem(this.props.item)}>
        {/* PICKEDUP : White with no icon CLIKABLE TO CONFIRM */}
          <View>
            <ItemRowContent item={this.props.item} />
          </View>
        </TouchableHighlight>
      )

    } else if (this.props.item.status === 'FINISHED') {
      return (
        <TouchableHighlight onPress={() => Actions.postsItemScene({item: this.props.item})}>
        {/* FINISHED : green with check icon */}
          <View>
            <ItemRowContent item={this.props.item} />
          </View>
        </TouchableHighlight>
      )

    } else if (this.props.item.status === 'PENDING') {
      return (
        <Swipeout
          right={this.state.deleteButton}
          autoClose
          sensitivity={0.9}
          style={{backgroundColor: colors.background}}
        >
        {/* PENDING : orange with question mark icon SWIPABLE TO DELETE IT */}
          <TouchableHighlight onPress={() => Actions.postsItemScene({
            item: this.props.item
          })}>
            <View>
              <ItemRowContent item={this.props.item} />
            </View>
          </TouchableHighlight>
        </Swipeout>
      )

    } else if (this.props.item.status === 'EXPIRED') {
      return (
        <Swipeout
          right={this.state.deleteButton}
          autoClose
          sensitivity={0.9}
          style={{backgroundColor: colors.background}}
        >
        {/* EXPIRED : grey with cross icon SWIPABLE TO DELETE IT */}
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
