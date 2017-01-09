import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import { colors } from '../../../style'
import ProgressiveImage from '../../../components/ProgressiveImage'

export default class ItemRow extends Component {

  render () {
    return (
      <View style={{flex: 1}}>
        <Card>
          <View style={styles.row}>
            <ProgressiveImage
              thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
              imageSource={{ uri: this.props.item.imgUrl }}
              style={styles.image}
            />
            <View style={{flex: 2, marginLeft: 5}}>
              <AppText style={StyleSheet.flatten(styles.title)}>
                {this.props.item.title} publié {distanceInWordsToNow(
                    this.props.item.publishDate,
                    {locale: frLocale, addSuffix: true}
                  )}
              </AppText>
              <AppText style={StyleSheet.flatten(styles.category)}>
                {this.props.item.category}
              </AppText>
              <View style={styles.content}>
                <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 200, marginBottom: 8}}>
                  <Icon
                    name='star'
                    iconStyle={{marginTop: 10}}
                    size={20}
                    color='gold'
                  />
                  <AppText> {this.props.item.nLikes}</AppText>
                </View>
              </View>
              <View
                style={styles.content}
              >
                <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 200, marginBottom: 5}}>
                  <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color={colors.secondary} />
                  <AppText> {this.props.item.nViews}</AppText>
                </View>
              </View>

            </View>
            {this.props.item.status === 'FINISHED' &&
              <View style={styles.overlayFinished} >
                <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 150, marginTop: 9}}>
                  <Icon name='check-circle' iconStyle={{marginTop: 10}} size={100} color='darkgreen' />
                </View>

              </View>
            }
            {this.props.item.status === 'PICKEDUP' &&
              <View style={styles.pickedup} >
                <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 150, marginTop: 9}}>
                  <Icon name='help' iconStyle={{marginTop: 10}} size={100} color='orange' />
                </View>
              </View>
            }
          </View>
        </Card>
      </View>
    )
  }
}

ItemRow.propTypes = {
  item: React.PropTypes.object,
  onDeleteItem: React.PropTypes.func,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  category: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10
  },
  image: {
    width: 100 - 10,
    height: 100 - 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  title: {
    marginLeft: 10,
    marginTop: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10
  },
  streetName: {
    color: colors.link
  },
  distance: {
    fontStyle: 'italic',
    color: colors.background,
    marginRight: 5
  },
  recup: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
    opacity: 0.2
  },
  overlayFinished: {
    flex: 1,
    position: 'absolute',
    left: -10,
    top: 0,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    width: 365,
    height: 117
  },
  pickedup: {
    flex: 1,
    position: 'absolute',
    left: -10,
    top: 0,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: 'peachpuff',
    width: 365,
    height: 117
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
