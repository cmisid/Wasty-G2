import React, { Component } from 'react'

import AppText from './AppText'

export default class EventRow extends Component {
  render () {
    return (
      <AppText>
        {this.props.event.action}
      </AppText>
    )
  }
}
