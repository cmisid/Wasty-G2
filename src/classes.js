import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import { generateMapLink } from './util'

export class Address {
  constructor ({addition, cityName, districtName, lat, lon, postalCode, streetName, streetNumber}) {
    this.addition = addition
    this.cityName = cityName
    this.districtName = districtName
    this.lat = lat
    this.lon = lon
    this.postalCode = postalCode
    this.streetName = streetName
    this.streetNumber = streetNumber
  }

  get readableAddress () {
    // Get the a human readable representation of the address.
    return `${this.streetNumber}, ${this.streetName}, ${this.cityName}`
  }

  generateMapLink (sourceLat, sourceLon) {
    // Return a Google Maps link indicating how to go the address from some given latitude and
    // longitude values.
    return generateMapLink(sourceLat, sourceLon, this.lat, this.lon)
  }
}

export class User {
  constructor ({address, birthDate, email, firstName, gender, imgUrl, imgPlaceholderUrl, joinDate, lastName, phoneNumber, scp, carSize}) {
    this.address = address // Instance of class Address
    this.birthDate = birthDate
    this.carSize = carSize
    this.email = email
    this.firstName = firstName
    this.gender = gender
    this.imgUrl = imgUrl
    this.imgPlaceholderUrl = imgPlaceholderUrl
    this.joinDate = joinDate
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.scp = scp
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  get readableInscriptionSince () {
    return distanceInWordsToNow(this.joinDate, {locale: frLocale, addSuffix: true})
  }
}

export class Item {
  constructor ({address, availabilityUntil, availabilitySince, category, cumbersomenesses, description, id, imgUrl, imgPlaceholderUrl, nLikes, nViews, picker, publishDate, publisher, price, status, title, volume, weight}) {
    this.address = address // Instance of class Address
    this.availabilityUntil = availabilityUntil
    this.availabilitySince = availabilitySince
    this.category = category
    this.cumbersomenesses = cumbersomenesses
    this.description = description
    this.id = id
    this.imgUrl = imgUrl
    this.imgPlaceholderUrl = imgPlaceholderUrl
    this.nLikes = nLikes
    this.nViews = nViews
    this.picker = picker
    this.publishDate = publishDate
    this.publisher = publisher // Instance of class User
    this.price = price
    this.status = status // One of "PENDING", "PICKEDUP", "FINISHED"
    this.title = title
    this.volume = volume
    this.weight = weight
  }

  get readablePublishedSince () {
    return distanceInWordsToNow(this.publishDate, {locale: frLocale, addSuffix: true})
  }
}

export class Event {
  constructor ({action, item, date}) {
    this.action = action
    this.item = item // Instance of class Item
    this.date = date
  }
}
