/* These parsers are defined in the same order as the classes. They link the
JSON responses (noted r) from the server to our classes. */

import { Address, Event, Item, User } from '../classes'

export const parseAddress = r => new Address({
  addition: r.addition,
  cityName: r.city_name,
  districtName: r.district_name,
  lat: r.lat,
  lon: r.lon,
  postalCode: r.postal_code,
  streetName: r.street_name,
  streetNumber: r.street_number
})

export const parseUser = r => new User({
  address: r.address ? parseAddress(r.address) : null,
  birthDate: r.birth_date,
  carSize: r.carSize,
  email: r.email,
  firstName: r.first_name,
  gender: r.gender,
  imgUrl: r.img,
  imgPlaceholderUrl: r.img_placeholder,
  joinDate: r.date_joined,
  lastName: r.last_name,
  phoneNumber: r.phone_number,
  scp: r.scp
})

export const parseItem = r => new Item({
  address: r.address ? parseAddress(r.address) : null,
  availabilityUntil: r.availability_until,
  availabilitySince: r.availability_since,
  category: r.category,
  cumbersomenesses: r.cumbersomenesses,
  description: r.description,
  id: r.id,
  imgUrl: r.img,
  imgPlaceholderUrl: r.img_placeholder,
  nLikes: r.likes,
  nViews: r.views,
  picker: r.picker ? parseUser(r.picker) : null,
  publishDate: r.publish_date,
  publisher: r.publisher ? parseUser(r.publisher) : null,
  price: r.price,
  status: r.status,
  title: r.title,
  volume: r.volume,
  weight: r.weight
})

export const parseEvent = r => new Event({
  action: r.action,
  item: r.item ? parseItem(r.item) : null,
  date: r.date
})
