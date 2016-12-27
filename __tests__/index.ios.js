import 'react-native'
import React from 'react'

import renderer from 'react-test-renderer'

import Overlay from '../src/components/Overlay'

it('renders correctly', () => {
  const tree = renderer.create(
    <Overlay iconLabel='bolt' message='Vous êtes hors-ligne' />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
