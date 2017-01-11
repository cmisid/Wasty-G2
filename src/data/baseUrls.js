import { isProd } from '../config'

// Contains the base URLs pointing towards the various microservices we use.

// TODO: add the production url
export const ROUTING = isProd ? 'http://localhost:5000/' : 'http://localhost:5000/'
