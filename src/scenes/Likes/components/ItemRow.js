import React, { Component } from 'react'
import { View, StyleSheet, Linking, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Swipeout from 'react-native-swipeout'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { colors } from '../../../style'

export default class ItemRow extends Component {

  constructor (props) {
    super(props)
    this.state = {
      Buttons: [
        {
          text: 'Supprimer',
          backgroundColor: 'lightcoral',
          color: 'white',
          underlayColor: 'dimgray',
          onPress: () => this.props.onDeleteItem(this.props.item.id)
        },
        {
          text: 'Récupérer',
          backgroundColor: 'limegreen',
          color: 'white',
          underlayColor: 'green',
          onPress: () => this.props.onPickedUpItem(this.props.item.id)
        }
      ]
    }
  }


  render () {
    return (
      <Swipeout
        right={this.state.Buttons}
        autoClose
        sensitivity={0.9}
        style={{backgroundColor: colors.background}}
      >
        <TouchableHighlight onPress={this.props.onPressAction}>
          <View style={{flex: 1}}>
            <Card>
              {/* FIXME : corriger le marginTop */}
              <View style={{height: 100, flex: 1, flexDirection: 'row', margin: 10, marginTop: 5}}>

                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                  <ProgressiveImage
                    thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
                    imageSource={{ uri: this.props.item.imgUrl }}
                    style={styles.image}
                  />
                </View>

                <View style={{flex: 4, justifyContent: 'center', paddingLeft: 5}}>
                  <AppText style={{fontWeight: 'bold'}}>
                    {this.props.item.title}
                  </AppText>
                  <AppText style={{color: 'grey'}}>
                    {this.props.item.category}
                  </AppText>
                  <AppText
                    onPress={() => Linking.openURL(this.props.item.address.generateMapLink(
                      this.props.userLat,
                      this.props.userLon
                    ))}
                    style={{color: colors.link}}
                  >
                    {this.props.item.address.readableAddress}
                  </AppText>
                </View>

                {/* Icons */}
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  {/* Number of likes */}
                  <View style={{flexDirection: 'row', marginRight: 5}}>
                    <Icon name='star' iconStyle={{marginTop: 10}} size={20} color='gold' />
                    <AppText> {this.props.item.nLikes}</AppText>
                  </View>
                  {/* Number of views */}
                  <View style={{flexDirection: 'row', marginRight: 5}}>
                    <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color={colors.secondary} />
                    <AppText> {this.props.item.nViews}</AppText>
                  </View>
                </View>

              </View>
            </Card>
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  image: {
    width: 100 - 10,
    height: 100 - 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10
  },
  distance: {
    fontStyle: 'italic',
    color: colors.background,
    marginRight: 5
  }
})

ItemRow.propTypes = {
  item: React.PropTypes.object,
  onDeleteItem: React.PropTypes.func,
  onPickedUpItem: React.PropTypes.func,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}
