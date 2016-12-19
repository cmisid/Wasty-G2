import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ItemRow extends Component {
  render() {
    return (
      <View style={styles.item}>
        <Text>{this.props.title} - {this.props.category} [{this.props.publish_date}]</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    height: 50,
    backgroundColor: 'white',
    padding: 3
  },
});

ItemRow.propTypes = {
  title: React.PropTypes.string,
  category: React.PropTypes.string,
  publish_date: React.PropTypes.string
};