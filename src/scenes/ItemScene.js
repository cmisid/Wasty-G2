import React, { Component } from 'react'

import { ScrollView, View, StyleSheet, Dimensions, Image, Text, Linking } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import cardFooter from '../components/card/CardFooter'
import AppText from '../components/AppText'
import Container from '../components/Container'
import {generateMapLink, haversineDistance, distanceFmt, toRad} from './../util.js'

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

            <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}} >
              <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={19.5} color='green' />
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
              <AppText style={{marginBottom: 10, marginTop: 5}}>
                {this.props.item.category}
              </AppText>
            </View>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <cardFooter mapUrl = {generateMapLink(
                this.props.userLat,
                this.props.userLon,
                this.props.item.lat,
                this.props.item.lon)}
              
              />


            </View>
          </View>
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
  }
})

