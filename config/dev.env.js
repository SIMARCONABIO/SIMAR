'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"https://simar.conabio.gob.mx/api/v1/"',
  API_ASSETS_URL: '"https://simar.conabio.gob.mx/api/"',
  API_ROOT_URL: '"https://simar.conabio.gob.mx/"'
})
