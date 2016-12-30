export class Item {
  constructor ({category, cityName, imgUrl, imgPlaceholderUrl, lat, lon, nViews, publishDate, streetName, title, publisher}) {
    this.category = category
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
    this.joinDate = joinDate
    this.lastName = lastName
  }
}
