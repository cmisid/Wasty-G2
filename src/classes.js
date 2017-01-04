export class Item {
  constructor ({id, category,description, cityName, imgUrl, imgPlaceholderUrl, lat, lon, nViews, publishDate, streetName, title, publisher}) {
    this.id = id
    this.category = category
    this.description = description
    this.cityName = cityName
    this.imgUrl = imgUrl
    this.imgPlaceholderUrl = imgPlaceholderUrl
    this.lat = lat
    this.lon = lon
    this.nViews = nViews
    this.publishDate = publishDate
    this.streetName = streetName
    this.title = title
    this.publisher = publisher
  }
}

export class User {
  constructor ({email, firstName, imgUrl, joinDate, lastName}) {
    this.email = email
    this.firstName = firstName
    this.imgUrl = imgUrl
    this.imgPlaceholderUrl = imgUrl
    this.joinDate = joinDate
    this.lastName = lastName
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }
}

export class Event {
  constructor ({action, item, date}) {
    this.action = action
    this.item = item
    this.date = date
  }
}
