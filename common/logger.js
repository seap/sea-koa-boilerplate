import winston from 'winston'
import { isProduction, logInfoFile, logErrorFile } from '../config'

const logger = isProduction ? new (winston.Logger)({
    transports: [
      new (winston.transports.File)({
        name: 'info-file',
        maxsize: 81920,
        filename: logInfoFile,
        handleExceptions: true,
        level: 'info'
      }),
      new (winston.transports.File)({
        name: 'error-file',
        maxsize: 81920,
        filename: logErrorFile,
        handleExceptions: true,
        level: 'error'
      })
    ]
}) : new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      humanReadableUnhandledException: true,
      timestamp: function () {
        return new Date()
      },
      handleExceptions: true,
      level: 'debug'
    }),
    new (winston.transports.File)({
      name: 'info-file',
      maxsize: 81920,
      filename: logInfoFile,
      handleExceptions: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      maxsize: 81920,
      filename: logErrorFile,
      handleExceptions: true,
      level: 'error'
    })
  ]
  })

logger.log('debug', 'logger init')

export default logger;
