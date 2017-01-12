import React, {Component} from 'react'

import { Dimensions, Linking, StyleSheet, TouchableHighlight, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Swipeout from 'react-native-swipeout'
import { Actions } from 'react-native-router-flux'
import CornerLabel from 'react-native-smart-corner-label'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import CardHeader from '../../../components/card/CardHeader'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { toast } from '../../../util'
import { colors, zIndexes } from '../../../style'

export default class ItemRow extends Component {

  constructor (props) {
    super(props)
    this.likeButton = [
      {
        text: <Icon name='favorite-border' iconStyle={{marginTop: 10}} size={30} color='white' />,
        backgroundColor: colors.like,
        color: 'white',
        underlayColor: colors.like,
        onPress: () => this.onLeftSwipeoutPressed()
      }
    ]
  }

  onLeftSwipeoutPressed () {
    toast(<AppText style={{fontWeight: 'bold'}}>{`"${this.props.item.title}" a été ajouté à votre liste d'items`}</AppText>)
    this.props.onLikeItem(this.props.item.id)
  }

  render () {
    return (
      <Swipeout
        right={this.likeButton}
        autoClose
        sensitivity={0.9}
        style={{backgroundColor: colors.background}}
      >
        <TouchableHighlight onPress={this.props.onPressAction}>
          <View style={{flex: 1}}>
            <Card>

              <CardHeader
                title={this.props.item.title}
                category={this.props.item.category}
              />

              <View style={{zIndex: zIndexes.background}}>
                {/* Item image */}
                <ProgressiveImage
                  thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
                  imageSource={{ uri: this.props.item.imgUrl }}
                  style={styles.image}
                />
                {/* Corner label to display the item price */}
                <CornerLabel
                  alignment='right'
                  cornerRadius={60}
                  style={{backgroundColor: this.props.item.price > 0.0 ? 'orange' : 'mediumseagreen', borderRadius: 20}}
                  textStyle={{fontSize: 10, color: 'white', fontWeight: 'bold'}}
                >
                  {this.props.item.price > 0.0 ? `\n${this.props.item.price} €` : '\nGRATUIT'}
                </CornerLabel>
              </View>
              {/* Metadata footer */}
              <View style={{height: 80, flex: 1, flexDirection: 'row'}}>

                {/* User image */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableHighlight
                    onPress={() => Actions.searchUserScene({user: this.props.item.publisher})}
                    underlayColor={colors.transparent}
                  >
                    <View>
                      <ProgressiveImage
                        thumbnailSource={{ uri: this.props.item.publisher.imgPlaceholderUrl }}
                        imageSource={{ uri: this.props.item.publisher.imgUrl }}
                        style={{width: 40, height: 40, borderRadius: 20}}
                      />
                    </View>
                  </TouchableHighlight>
                </View>

                {/* Item essential information */}
                <View style={{flex: 4, justifyContent: 'center'}}>
                  {/* Item's publisher full name */}
                  <View style={{flexDirection: 'row'}}>
                    <AppText>{this.props.item.publisher.fullName}</AppText>
                    <AppText style={{color: colors.background}}> {this.props.item.readablePublishedSince}</AppText>
                  </View>
                  {/* Item's address */}
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
  image: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2 - 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 1
  }
})

ItemRow.propTypes = {
  item: React.PropTypes.object,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number,
  onLikeItem: React.PropTypes.func
}
