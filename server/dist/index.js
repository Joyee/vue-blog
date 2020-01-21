const path = require('path')
const express = require('express')
const bodyParser = require('body-parser') // express中间件 作用是对post请求体进行解析
const routes = require('./routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../dist')))

app.all('*', (req, res, next) => {
  //这里处理全局拦截，一定要写在最上面
  next()
})

// 后端api路由
app.use('/api', routes)

app.listen(3000, () => {
  console.log('Start listening at port: 3000')
})