const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const { jwtAuth, decode } = require('../utils/user-jwt')
const router = express.Router()

router.use(jwtAuth)

router.use('/user', userRouter)

router.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    const { status = 401, message } = err
    res.status(status).json({
      code: status,
      msg: 'token验证失败',
      data: {}
    })
  } else {
    const { output } = err || {}
    const errCode = (output && output.statusCode) || 500
    const errMsg = (output && output.payload && output.payload.error) || err.message
    res.status(errCode).json({
      code: errCode,
      msg: errMsg
    })
  }
})

module.exports = router