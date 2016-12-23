import React from 'react'
import { AppRegistry } from 'react-native'

if (__DEV__) {
    require('./ReactotronConfig')
}

import App from './src/App'

AppRegistry.registerComponent('Wasty', () => App)
