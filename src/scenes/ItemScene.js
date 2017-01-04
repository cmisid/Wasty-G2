import React, { Component } from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'

import ProgressiveImage from '../components/ProgressiveImage'

import AppText from '../components/AppText'
import Container from '../components/Container'

export default class ItemScene extends Component {
  render () {
    return (
      <Container>
        <View style={styles.wrapper}>
          <AppText style={styles.header}>
            Publié par {this.props.item.publisher.firstName} {this.props.item.publisher.lastName} le {this.props.item.publishDate}
          </AppText>
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.item.imgUrl }}
            style={styles.image}
          />
          <View style={styles.wrapper}>
            <AppText style={styles.header>
              {this.props.item.category}
            </AppText>
            <AppText>
              Description
            </AppText>
            <AppText>
              {{this.props.item.description}
            </AppText>
          </View>
        </View>
      </Container>
    )
  }
}

ItemScene.propTypes = {
  item: React.PropTypes.object
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
    textAlign: 'center',
    fontFamily: 'Cochin'
  },
  wrapper: {
    padding: 20,
    flex: 1
  }
})

