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
    this.imgPlaceholderUrl = imgUrl
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
  constructor ({address, category, description, id, imgUrl, imgPlaceholderUrl, nViews, publishDate, title, publisher}) {
    this.address = address // Instance of class Address
    this.category = category
    this.description = description
    this.id = id
    this.imgUrl = imgUrl
    this.imgPlaceholderUrl = imgPlaceholderUrl
    this.nViews = nViews
    this.publishDate = publishDate
    this.title = title
    this.publisher = publisher // Instance of class User
  }
}

export class Event {
  constructor ({action, item, date}) {
    this.action = action
    this.item = item // Instance of class Item
    this.date = date
  }
}
