const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const md5 = require('../utils/md5')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY,  JWT_EXPIRED } = require('../utils/constant')
const { decode } = require('../utils/user-jwt')
const { login, findUser, addUser } = require('../services/users')

const Res = require('../utils/ResClass')

function resJson (_res, result) {
  return _res.json(new Res(result))
}
// 登录
const loginValidator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误')
]

router.post('/login', loginValidator, function (req, res, next) {
  const err = validationResult(req)
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    const [ { msg }] = err.errors
    next(boom.badRequest(msg))
  } else {
    let _res = res
    let { username, password } = req.body

    password = md5(password)
    let _data = null
    login(username, password).then(user => {
      if (!user || user.length === 0) {
        _data = {
          code: -1,
          msg: '用户名或密码错误',
          data: {}
        }
      } else {
        const token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED })
        _data = {
          code: 0,
          msg: '登录成功',
          data: {
            token
          }
        }
      }

      resJson(_res, _data)
    })
  }
})

// 注册
const registerValidator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误'),
  body('age').exists().withMessage('年龄不能为空')
]

router.post('/add', registerValidator, function (req, res, next) {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    const [ { msg }] = err.errors
    next(boom.badRequest(msg))
  } else {
    let _res = res
    let { username, password, age } = req.body

    password = md5(password)
    age = parseInt(age)

    let _data

    addUser(username, password, age).then(response => {
      // console.log('====add result====', response)
      if (!response || response.length === 0) {
        _data = {
          code: -1,
          msg: '注册失败',
          data: {}
        }
      } else {
        _data = {
          code: 0,
          msg: 'success',
          data: {}
        }
      }
      resJson(_res, _data)
    })
  }
})

// 获取用户信息
router.get('/info', function (req, res, next) {
  const token = decode(req)
  findUser(token.username).then(user => {
    if (user) {
      resJson({
        code: 0,
        msg: 'success',
        data: {
          user,
          role: 'admin' // admin, editor, visitor
        }
      })
    } else {
      resJson({
        code: -1,
        msg: '用户不存在',
        data: {}
      })
    }
  })
})

module.exports = router