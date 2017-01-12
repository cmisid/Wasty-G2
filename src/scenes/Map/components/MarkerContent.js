import React, {Component} from 'react'

import { Dimensions, Linking, StyleSheet, TouchableHighlight, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Swipeout from 'react-native-swipeout'
import Toast from 'react-native-root-toast'
import { Actions } from 'react-native-router-flux'
import CornerLabel from 'react-native-smart-corner-label'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import CardHeader from '../../../components/card/CardHeader'
import ProgressiveImage from '../../../components/ProgressiveImage'
import { colors, zIndexes } from '../../../style'
import { toast } from '../../../util'

export default class MarkerContent extends Component {

  constructor (props) {
    super(props)
    this.iconName = this.props.item.favorite === true ? 'favorite' : 'favorite-border'
    this.likeButtonText = (<Icon name={this.iconName} iconStyle={{marginTop: 10}} size={30} color='white' />)
    this.likeButton = [
      {
        text: this.likeButtonText,
        backgroundColor: this.props.item.favorite === true ? colors.markers.favorite : colors.markers.basic,
        color: 'white',
        underlayColor: 'orange',
        onPress: () => this._onLeftSwipeoutPressed()
      }
    ]
  }

  _onLeftSwipeoutPressed () {
    if (this.props.item.favorite === false) {
      this.props.item.favorite = true
      toast(<AppText style={StyleSheet.flatten(styles.toast)}>{`"${this.props.item.title}" a été ajouté à votre liste de favoris`}</AppText>)
    } else {
      this.props.item.favorite = false
      toast(<AppText style={StyleSheet.flatten(styles.toast)}>{`"${this.props.item.title}" a été retiré de votre liste de favoris`}</AppText>)
    }
    this.props.onLikeItem(this.props.item.id, this.props.item.favorite)
  }

  render () {
    return (
      <Card>
        {/* Item title and category */}
        <CardHeader
          title={this.props.item.title}
          category={this.props.item.category}
        />
        {/* Swipeout to add an item as favorite */}
        <Swipeout
          right={this.likeButton}
          autoClose
          sensitivity={0.9}
          style={{backgroundColor: colors.background}}
        >
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
        </Swipeout>
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
    )
  }
}

const styles = StyleSheet.create({
  toast: {
    fontWeight: 'bold'
  },
  image: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 4 - 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 1
  }
})

MarkerContent.propTypes = {
  item: React.PropTypes.object,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number,
  onLikeItem: React.PropTypes.func
}
