import React, { Component } from 'react'

import UserView from '../components/UserView'
import Container from '../components/Container'

export default class UserScene extends Component {

  render () {
    return (
      <Container>
        <UserView
          user={this.props.user}
        />
      </Container>
    )
  }
}

UserScene.propTypes = {
  user: React.PropTypes.object
}
