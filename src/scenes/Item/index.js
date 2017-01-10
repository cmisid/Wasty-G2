import React, { Component } from 'react'

import { ScrollView, View, StyleSheet, Dimensions, Image, Text, Linking } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../../components/AppText'
import Container from '../../components/Container'
import { colors } from '../../style'
import { distanceFmt, generateMapLink, haversineDistance } from '../../util.js'

export default class ItemScene extends Component {
  render () {
    return (
      <Container>
        <ScrollView style={styles.wrapper}>
          <AppText style={StyleSheet.flatten(styles.header)}>
            Publié par {this.props.item.publisher.firstName} {this.props.item.publisher.lastName} le {this.props.item.publishDate}
          </AppText>
          <View style={{borderColor: 'lightgrey', borderWidth: 1, alignItems: 'flex-start', borderRadius: 0, backgroundColor: '#efeff2'}}>
            <Image
              source={{ uri: this.props.item.imgUrl }}
              style={styles.image}
            >
            </Image>
            <View style={styles.publishMetadata}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <AppText style={StyleSheet.flatten(styles.distance)}>
                  {distanceFmt(haversineDistance(
                    this.props.userLat,
                    this.props.userLon,
                    this.props.item.address.lat,
                    this.props.item.address.lon
                  ))}
                </AppText>
                <AppText style={{marginBottom: 0, marginTop: 5}}>
                  {this.props.item.category}
                </AppText>
              </View>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={StyleSheet.flatten(styles.streetName)}
                  onPress={() => Linking.openURL(generateMapLink(
                    this.props.userLat,
                    this.props.userLon,
                    this.props.item.address.lat,
                    this.props.item.address.lon
                  ))}
                >
                  {`${this.props.item.address.streetName}, ${this.props.item.address.cityName}`}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginRight: 5}}>
                <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color={colors.secondary} />
                
                <AppText>{this.props.item.nViews}</AppText>
              </View>
            </View>
          </View>
          <AppText style={StyleSheet.flatten(styles.description)}>
            Description
          </AppText>
          <AppText style={{textAlign: 'center'}}>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'flex-end'

  },
  publishMetadata: {
    flex: 1,
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
