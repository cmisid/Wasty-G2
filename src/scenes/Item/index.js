import React, { Component } from 'react'

import { ScrollView, View, StyleSheet, Dimensions, Linking } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'
import AppText from '../../components/AppText'
import Container from '../../components/Container'
import { colors } from '../../style'
import ProgressiveImage from '../../components/ProgressiveImage'

export default class ItemScene extends Component {
  render () {
    return (
      <Container>
        <ScrollView style={styles.wrapper}>
          <View style={{flex: 1}}>
            <ProgressiveImage
              thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
              imageSource={{ uri: this.props.item.imgUrl }}
              style={styles.image}
            />

            {/* Metadata footer */}
            <View style={{backgroundColor: '#efeff2', height: 55, flex: 1, flexDirection: 'row', borderColor: 'lightgrey'}}>

              {/* Item essential information */}
              <View style={{flex: 4, justifyContent: 'center', marginLeft: 10}}>

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
          </View>
          <AppText />
          <AppText style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'black'}}>
            {this.props.item.title} - {this.props.item.category}
          </AppText>
          <AppText style={{textAlign: 'center', fontSize: 12}}>
            <AppText style={{color: 'darkgrey'}}>
              {`Publié par `}
            </AppText>
            <AppText
              style={{color: 'grey'}}
              onPress={() => Actions.postsUserScene({user: this.props.item.publisher})}>
              {this.props.item.publisher.firstName} {this.props.item.publisher.lastName}
            </AppText>
            <AppText style={{color: 'darkgrey'}}>
              {` ${this.props.item.readablePublishedSince}`}
            </AppText>
          </AppText>
          {/* Those both tags allow us to make a double space  between the publish date and the item's description. */}
          <AppText />
          <AppText style={{textAlign: 'justify', marginBottom: 15, color: 'black'}}>
            {this.props.item.description}
          </AppText>
        </ScrollView>
      </Container>
    )
  }
}

ItemScene.propTypes = {
  item: React.PropTypes.object,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}

const styles = StyleSheet.create({
  image: {
    paddingTop: 60,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'flex-end'

  },
  publishMetadata: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10
  },
  header: {
    marginLeft: 0,
    marginBottom: 0,
    textAlign: 'center',
    fontSize: 12
  },
  description: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  city: {
    textAlign: 'right'
  },
  wrapper: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white'
  },
  cont: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
    width: 320
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  backdrop: {
    paddingTop: 60,
    width: 320,
    height: 220
  },
  streetName: {
    marginLeft: 5,
    color: colors.link
  }
})
