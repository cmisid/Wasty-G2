import { AsyncStorage } from 'react-native'

import { Item, User } from '../classes'

export const getItems = () => {
  return new Promise((resolve, reject) => {
    const response = [
      {
        'title': 'Canapé cuir',
        'category': 'AMEUBLEMENT',
        'img': 'https://unsplash.it/300/300/',
        'img_placeholder': 'https://unsplash.it/100/100/?blur',
        'publish_date': '2016-12-26T00:34:00',
        'publisher': {
          'email': 'axel.bellec@outlook.fr',
          'first_name': 'Axel',
          'img_url': 'https://avatars2.githubusercontent.com/u/11810069?v=3&s=460.jpg',
          'last_name': 'Bellec',
          'date_joined': '2016-11-26T00:34:00'
        },
        'views': 14,
        'coordinates': {
          'lat': 48.5712432,
          'lon': -3.1075241999999434
        },
        'street_name': 'Rue St Michel',
        'city_name': 'Toulouse'
      },
      {
        'title': 'Portes coulissantes',
        'category': 'BOIS ET MATERIAUX',
        'img': 'https://unsplash.it/300/300/',
        'img_placeholder': 'https://unsplash.it/100/100/?blur',
        'publish_date': '2016-12-19T00:00:00',
        'publisher': {
          'email': 'maxhalford25@gmail.com',
          'first_name': 'Max',
          'img': 'https://avatars2.githubusercontent.com/u/8095957?v=3&s=460.jpg',
          'last_name': 'Halford',
          'date_joined': '2016-11-26T00:34:00'
        },
        'views': 26,
        'coordinates': {
          'lat': 48.560811,
          'lon': -3.148260
        },
        'street_name': 'Rue Jeanne d\'Arc',
        'city_name': 'Toulouse'
      },
      {
        'title': 'Frigo',
        'category': 'ELECTROMENAGER',
        'img': 'https://unsplash.it/300/300/',
        'img_placeholder': 'https://unsplash.it/100/100/?blur',
        'publish_date': '2016-12-20T00:00:00',
        'publisher': {
          'email': 'axel.bellec@outlook.fr',
          'first_name': 'Axel',
          'img': 'https://avatars2.githubusercontent.com/u/11810069?v=3&s=460.jpg',
          'last_name': 'Bellec',
          'date_joined': '2016-11-26T00:34:00'
        },
        'views': 57,
        'coordinates': {
          'lat': 48.571243,
          'lon': -3.107527
        },
        'street_name': 'Allée de Barcelone',
        'city_name': 'Toulouse'
      }
    ]

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

export const getAccountSettings = () => AsyncStorage.getItem('accountSettings')
