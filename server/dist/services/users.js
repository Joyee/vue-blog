const { queryOne, querySql } = require('../db/index')
const $sql = require('../models/sqlMap')

function login(username, password) {
  return querySql($sql.user.queryByNamePassword, [username, password])
}

function findUser(username) {
  return queryOne($sql.user.query, [username])
}

function addUser(username, password, age) {
  return querySql($sql.user.add, [username, password, age])
}

module.exports = {
  login,
  findUser,
  addUser,
}