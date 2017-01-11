import Toast from 'react-native-root-toast'

import { colors } from './style'

export const generateMapLink = (sourceLat, sourceLon, destLat, destLon) => (
  `http://maps.google.com/maps?saddr=${sourceLat},${sourceLon}&daddr=${destLat},${destLon}`
)

const _toRad = x => x * Math.PI / 180

export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = _toRad(lat2 - lat1)
  const dLon = _toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(_toRad(lat1)) *
    Math.cos(_toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const distanceFmt = dist => dist < 1 ? `${Math.round((dist * 1000).toFixed(2), 1)} m` : `${Math.round(dist.toFixed(2), 1)} km`

export const generateGoogleMapsItinerary = (listOfLatLon) => {
  // Example :
  // let listOfLatLon = [{lat: 43.589246, lon: 1.445684}, {lat: 43.589246, lon: 1.475684}, {lat: 43.989246, lon: 1.445684}]
  // ggmapsItineraryUrl = generateGoogleMapsItinerary(listOfLatLon)
  // console.log(ggmapsItineraryUrl)
  // 'https://www.google.com/maps/dir/43.589246,1.445684/43.589246,1.475684/43.989246,1.445684'

  let url = 'https://www.google.com/maps/dir/'
  listOfLatLon.forEach(coord => { url = url + `${coord.lat},${coord.lon}/` })
  return url
}

export const toast = text => Toast.show(
  text,
  {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 500,
    backgroundColor: colors.primary,
    shadowColor: colors.background,
    textColor: 'white'
  }
)
