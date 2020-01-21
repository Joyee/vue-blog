// 定义jwt-token验证和jwt-token解析函数
// 引入验证jsonwebtoken
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
// 自定义的jwt密钥
const { PRIVATE_KEY } = require('./constant')

// 验证token是否过期
const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization) {
      return req.headers.authorization
    } else if (req.query && req.query.token) {
      return  req.query.token
    }
    return null
  }
}).unless({
  path: [
      '/',
      '/api/user/login',
      '/api/user/add',
  ]
})

// jwt-token解析
function decode(req) {
  const token = req.get('Authorization')
  return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
  jwtAuth,
  decode
}