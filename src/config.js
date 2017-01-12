// Let's set a default environment called 'dev‘
export const appEnv = process.env.APP_ENV || 'dev'

export const isProd = appEnv === 'prod'

// TODO: add the production url
export const WEB_SERVICES_URLS = {
  ROUTING_URL: isProd ? 'http://localhost:5000' : 'http://localhost:5000',
  IMG_CLASSIFIER_URL: isProd ? 'http://localhost:5000' : 'http://localhost:5000'
}

