import { AsyncStorage } from 'react-native'

import { Item, User } from '../classes'

export const getItems = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/items.json')

    const items = response.map(item => new Item({
      category: item.category,
      cityName: item.city_name,
      imgUrl: item.img,
      imgPlaceholderUrl: item.img_placeholder,
      lat: item.coordinates.lat,
      lon: item.coordinates.lon,
      nViews: item.views,
      publishDate: item.publish_date,
      streetName: item.street_name,
      title: item.title,
      publisher: new User({
        email: item.publisher.email,
        firstName: item.publisher.first_name,
        imgUrl: item.publisher.img_url,
        joinDate: item.publisher.date_joined,
        lastName: item.publisher.last_name
      })
    }))

    resolve(items)
  })
}

export const getUserItems = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/userItems.json')

    const items = response.map(item => new Item({
      category: item.category,
      cityName: item.city_name,
      imgUrl: item.img,
      imgPlaceholderUrl: item.img_placeholder,
      lat: item.coordinates.lat,
      lon: item.coordinates.lon,
      nViews: item.views,
      publishDate: item.publish_date,
      streetName: item.street_name,
      title: item.title
    }))

    resolve(items)
  })
}

export const getAccountSettings = () => AsyncStorage.getItem('accountSettings')
