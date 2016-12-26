import 'react-native'
import React from 'react'
import Overlay from '../src/components/Overlay'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Overlay iconLabel='bolt' message='Vous êtes hors-ligne' />
  )
})
