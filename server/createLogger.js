import winston from 'winston'

const { format } = winston
const lineFormat = format.printf(info => {
  return `${info.timestamp} ${info.req.ip} ${info.session.id} ${info.user.user_id} ${info.level}: ${info.message}`
})

const createLogger = function (req) {
  const logger = winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console()
    ],
    format: format.combine(
      (format(function (info, opt) {
        info.req = req || {}
        info.session = req.session || {}
        info.user = req.user || {}
        return info
      }))(),
      format.colorize(),
      format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss.SSS' }),
      format.align(),
      format.splat(),
      lineFormat
    )
  })

  return logger
}

export default createLogger
