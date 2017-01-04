import React, { Component } from 'react'

import { ScrollView, View, StyleSheet, Dimensions, Text, Image } from 'react-native'

import ProgressiveImage from '../components/ProgressiveImage'
import Icon from 'react-native-vector-icons/MaterialIcons'

import AppText from '../components/AppText'
import Container from '../components/Container'

const toRad = x => x * Math.PI / 180

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

  return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const distanceFmt = dist => dist < 1 ? `${Math.round((dist * 1000).toFixed(2), 1)} m` : `${Math.round(dist.toFixed(2), 1)} km`

export default class ItemScene extends Component {
  render () {
    return (
      <Container>
        <ScrollView style={styles.wrapper}>
          <AppText style={styles.header}>
            Publié par {this.props.item.publisher.firstName} {this.props.item.publisher.lastName} le {this.props.item.publishDate}
          </AppText>
          <Image
            source={{ uri: this.props.item.imgUrl }}
            style={styles.image}
          >
            <View >
              <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color = 'green'/>
              <AppText>{this.props.item.nViews}</AppText>
            </View>
          </Image>

          <View style={styles.publishMetadata}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <AppText style={StyleSheet.flatten(styles.distance)}>
                {distanceFmt(haversineDistance(
                this.props.userLat,
                this.props.userLon,
                this.props.item.lat,
                this.props.item.lon
              ))}
              </AppText>
            </View>
            <View style={{flex: 2, flexDirection: 'column'}}> 
              <AppText>
                {this.props.item.streetName}, {this.props.item.cityName}
              </AppText>
            </View>
          </View>
          <AppText style={styles.header}>
            {this.props.item.category}
          </AppText>
          <AppText style={styles.description}>
            Description
          </AppText>
          <AppText>
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
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2 - 10,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'flex-end'
    
  },
  publishMetadata: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10
  },
  header: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  city: {
    textAlign: 'right'
  },
  wrapper: {
    padding: 20,
    flex: 1
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
})

