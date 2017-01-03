import React, { Component } from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'

import ProgressiveImage from '../components/ProgressiveImage'

import AppText from '../components/AppText'
import Container from '../components/Container'

export default class ItemScene extends Component {
  render () {
    return (
      <Container>
        <View>
          <AppText>
            {this.props.item.title}
          </AppText> 
          <ProgressiveImage
            thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
            imageSource={{ uri: this.props.item.imgUrl }}
            style={styles.image}
          />
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

  }
})