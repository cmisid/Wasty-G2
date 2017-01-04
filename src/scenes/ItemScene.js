import React, { Component } from 'react'

import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'

import ProgressiveImage from '../components/ProgressiveImage'

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
          <View>
            <ProgressiveImage
              thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
              imageSource={{ uri: this.props.item.imgUrl }}
              style={styles.image}
              <Text style={styles.headline}>Headline</Text>
            />
          </View>
          <View style={styles.wrapper}>
            <AppText style={styles.city}>
              distance={distanceFmt(haversineDistance(
                this.props.userLat,
                this.props.userLon,
                this.props.item.lat,
                this.props.item.lon
              ))}
              {this.props.item.streetName}, {this.props.item.cityName}
            </AppText>
            <AppText style={styles.header}>
              {this.props.item.category}
            </AppText>
            <AppText style={styles.description}>
              Description
            </AppText>
            <AppText>
              {this.props.item.description}
            </AppText>
          </View>
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
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2 - 10,
    justifyContent: 'center',
    alignSelf: 'center'
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
    color: 'green'
  }
})

