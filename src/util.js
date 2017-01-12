import Toast from 'react-native-root-toast'

import { colors } from './style'

export const colorLuminance = (hex, lum) => {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  // Convert to decimal and change luminosity
  let rgb = '#'
  for (let i = 0; i < 3; i++) {
    let c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }
  return rgb
}

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
  /* Example :

  >>> let listOfLatLon = [
    {
      latitude: 43.589246,
      lon: 1.445684
    },
    {
      latitude: 43.589246,
      lon: 1.475684
    },
    {
      latitude: 43.989246,
      lon: 1.445684
  }]
  >>> ggmapsItineraryUrl = generateGoogleMapsItinerary(listOfLatLon)
  >>> console.log(ggmapsItineraryUrl)
  >>> https://www.google.com/maps/dir/43.589246,1.445684/43.589246,1.475684/43.989246,1.445684'
  */

  let url = 'https://www.google.com/maps/dir/'
  listOfLatLon.forEach(coord => { url = url + `${coord.latitude},${coord.longitude}/` })
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
