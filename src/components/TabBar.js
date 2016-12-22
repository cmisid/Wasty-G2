import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { colors } from '../style'

export default class TabBar extends Component {

  constructor(props) {
    super(props)
    this.tabIcons = []
  }

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? colors.primary : colors.inactive}
            ref={icon => { this.tabIcons[i] = icon; }}
          />
        </TouchableOpacity>
      })}
    </View>
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 9,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

TabBar.propTypes = {
  activeTab: React.PropTypes.number,
  goToPage: React.PropTypes.func,
  scrollValue: React.PropTypes.object,
  style: React.PropTypes.object,
  tabs: React.PropTypes.array
};
