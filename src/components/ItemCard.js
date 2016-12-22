import React, {Component} from 'react'
import { Image, StyleSheet } from 'react-native'

import Button from 'react-native-button'
import { Card, CardAction, CardContent, CardImage, CardTitle } from 'react-native-card-view'
import Lightbox from 'react-native-lightbox'

import AppText from './text/AppText'

export default class ItemCard extends Component {
  render () {
    return (
      <Card>
        <CardTitle>
          <AppText>{this.props.title}</AppText>
        </CardTitle>
        <CardImage>
          <Lightbox
            navigator={this.props.navigator}
            swipeToDismiss={true}
          >
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{uri: 'https://getmdl.io/assets/demos/image_card.jpg'}}
            />
          </Lightbox>
        </CardImage>
        <CardContent>
          <AppText>{`${this.props.category} - ${this.props.publish_date}`}</AppText>
        </CardContent>
        <CardAction >
          <Button
            style={styles.button}
            onPress={() => {}}>
            Consulter
          </Button>
        </CardAction>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10
  },
  image: {
    flex: 1,
    width: 300,
    height: 200
  }
});

ItemCard.propTypes = {
  category: React.PropTypes.string,
  navigator: React.PropTypes.node,
  publish_date: React.PropTypes.string,
  title: React.PropTypes.string
};
