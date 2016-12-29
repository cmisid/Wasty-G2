import React, { Component } from 'react'

import AppText from '../components/AppText'
import Container from '../components/Container'

export default class ItemScene extends Component {
  render () {
    return (
      <Container>
        <AppText>{this.props.item.title}</AppText>
      </Container>
    )
  }
}

ItemScene.propTypes = {
  item: React.PropTypes.object
}
