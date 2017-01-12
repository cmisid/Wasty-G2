import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../../../components/AppText'
import Card from '../../../components/card/Card'
import { colors } from '../../../style'
import ProgressiveImage from '../../../components/ProgressiveImage'


{/* One element of the list */}
export default class ItemRow extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <Card>
          <View style={{height: 100, flex: 1, flexDirection: 'row', margin: 10, marginTop: 5}}>

            {/* The picture */}
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <ProgressiveImage
                thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
                imageSource={{ uri: this.props.item.imgUrl }}
                style={styles.image}
              />
            </View>

            {/* Basics informations (title, category, time) */}
            <View style={{flex: 4, justifyContent: 'center', paddingLeft: 5}}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={{fontWeight: 'bold'}}>
                  {this.props.item.title}
                </AppText>
              </View>
              <AppText>
                {this.props.item.category}
              </AppText>
              <AppText style={{color: 'grey'}}>Publié {distanceInWordsToNow(
                this.props.item.publishDate,
                {locale: frLocale, addSuffix: true}
              )}
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
            {/* FIXME : corriger le style */}
            {/* Overlay for indicating the item's status */}
            {this.props.item.status === 'FINISHED' &&
              <View style={styles.overlayFinished} >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name='check-circle' size={100} color='darkgreen' />
                </View>
              </View>
            }
            {this.props.item.status === 'PICKEDUP' &&
              <View style={styles.pickedup} >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name='help' size={100} color='orange' />
                </View>
              </View>
            }
            {this.props.item.status === 'EXPIRED' &&
              <View style={styles.expired} >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name='cancel' size={100} color='gray' />
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
  item: React.PropTypes.object
}

const styles = StyleSheet.create({
  icons: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
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
    top: -5,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    width: 365,
    height: 115
  },
  pickedup: {
    flex: 1,
    position: 'absolute',
    left: -10,
    top: -5,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: 'peachpuff',
    width: 365,
    height: 115
  },
  expired: {
    flex: 1,
    position: 'absolute',
    left: -10,
    top: -5,
    opacity: 0.4,
    borderRadius: 5,
    backgroundColor: 'darkgray',
    width: 365,
    height: 115
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
