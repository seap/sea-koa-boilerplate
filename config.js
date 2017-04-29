const env = process.env.NODE_ENV || 'development'
// production mode
export const isProduction = env === 'production'
// server port
export const port = process.env.PORT || 4000

// session config
export const sessionKeys = ['koa', 'sea']
export const cookieKey = 'sea.sid'

// log file
export const logInfoFile = 'logs/sea-log-info.log'
export const logErrorFile = 'logs/sea-log-error.log'
