import { AsyncStorage } from 'react-native'

export const getItems = () => {
  return new Promise(function (resolve, reject) {
    resolve([
      {
        'title': 'Canapé cuir',
        'category': 'AMEUBLEMENT',
        'img_url': 'https://unsplash.it/300/300/',
        'publish_date': '2016-12-26T00:34:00',
        'publisher': {
          'publisher_id': 1,
          'name': 'Axel Bellec',
          'email': 'axel.bellec@outlook.fr',
          'user_img_url': 'https://avatars2.githubusercontent.com/u/11810069?v=3&s=460.jpg'
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
        'img_url': 'https://unsplash.it/300/400/',
        'publish_date': '2016-12-19T00:00:00',
        'publisher': {
          'publisher_id': 2,
          'name': 'Max Halford',
          'email': 'maxhalford25@gmail.com',
          'user_img_url': 'https://avatars2.githubusercontent.com/u/8095957?v=3&s=460.jpg'
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
        'img_url': 'https://unsplash.it/400/300/',
        'publish_date': '2016-12-20T00:00:00',
        'publisher': {
          'publisher_id': 1,
          'name': 'Axel Bellec',
          'email': 'axel.bellec@outlook.fr',
          'user_img_url': 'https://avatars2.githubusercontent.com/u/11810069?v=3&s=460.jpg'
        },
        'views': 57,
        'coordinates': {
          'lat': 48.571243,
          'lon': -3.107527
        },
        'street_name': 'Allée de Barcelone',
        'city_name': 'Toulouse'
      }
    ])
  })
}

export const getAccountSettings = () => AsyncStorage.getItem('accountSettings')
