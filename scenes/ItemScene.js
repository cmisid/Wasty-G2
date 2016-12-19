import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';

import ActionButton from 'react-native-action-button';

import ItemRow from '../components/ItemRow';
import AddItemModal from '../components/AddItemModal';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ItemScene extends Component {
	render() {
		return (
			<View style={styles.wrapper}>

	        <ListView
	          style={styles.list}
	          dataSource={ds.cloneWithRows(this.props.items)}
	          renderRow={item => <ItemRow title={item.title} category={item.category} publish_date={item.publish_date} />}
	          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
	          enableEmptySections={true}
	        />

		    <AddItemModal
	          ref={'addItemModal'}
	          onConfirm={this.props.addItem}
	        />

	        <ActionButton
	          buttonColor='seagreen'
	          onPress={() => this.refs.addItemModal.openModal() }
	        />

	        </View>
		)
	}

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  list: {
    flex: 1,
    paddingTop: 22
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
});

ItemScene.propTypes = {
  items: React.PropTypes.array,
};