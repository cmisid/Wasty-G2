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
}

export class User {
  constructor ({address, birthDate, email, firstName, gender, imgUrl, imgPlaceholderUrl, joinDate, lastName, phoneNumber, scp}) {
    this.address = address // Instance of class Address
    this.birthDate = birthDate
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
}

export class Item {
  constructor ({address, availabilityUntil, availabilitySince, category, description, id, imgUrl, imgPlaceholderUrl, nLikes, nViews, publishDate, publisher, price, status, picker, title}) {
    this.address = address // Instance of class Address
    this.availabilityUntil = availabilityUntil
    this.availabilitySince = availabilitySince
    this.category = category
    this.description = description
    this.id = id
    this.imgUrl = imgUrl
    this.imgPlaceholderUrl = imgPlaceholderUrl
    this.nLikes = nLikes
    this.nViews = nViews
    this.publishDate = publishDate
    this.publisher = publisher // Instance of class User
    this.price = price
    this.status = status // One of "PENDING", "PICKEDUP", "FINISHED"
    this.picker = picker
    this.title = title
  }
}

export class Event {
  constructor ({action, item, date}) {
    this.action = action
    this.item = item // Instance of class Item
    this.date = date
  }
}
