import { parseItem, parseEvent, parseUser } from './parsers'

export const getItems = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/items.json')
    const items = response.map(r => parseItem(r))
    resolve(items)
  })
}

export const getLikes = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/likes.json')
    const items = response.map(r => parseItem(r))
    resolve(items)
  })
}

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/posts.json')
    const items = response.map(r => parseItem(r))
    resolve(items)
  })
}

export const getUser = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/user.json')
    const user = parseUser(response)
    resolve(user)
  })
}

export const getEvents = () => {
  return new Promise((resolve, reject) => {
    const response = require('./mocks/events.json')
    const events = response.map(r => parseEvent(r))
    resolve(events)
  })
}
