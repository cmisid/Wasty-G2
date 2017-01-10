// Let's set a default environment called 'dev‘
export const appEnv = process.env.APP_ENV || 'dev'

export const isProd = appEnv === 'prod'
