
const express = require('express')
const app = express()
const bodyParser = require('body-parser') // express中间件 作用是对post请求体进行解析
const Res = require('./utils/ResClass')
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


function resJson (_res, result) {
  return _res.json(new Res(result))
}

module.exports = { app, pool, resJson, router }