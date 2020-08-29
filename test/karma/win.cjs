const { modernConfig } = require('./shared.cjs')

module.exports = function (config) {
  const c = modernConfig()
  c.browsers = ['Chrome', 'Firefox', 'Opera']
  c.logLevel = config.LOG_INFO
  config.set(c)
}
