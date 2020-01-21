const mysql = require('mysql')
const config = require('./config')

const conn = mysql.createConnection(config.mysql)

conn.connect()

function querySql(sql, params = []) {
  // const conn = connection().connect()
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, params, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })
}

function queryOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    querySql(sql, params).then(results => {
      if (results && results.length > 0) {
        resolve(results[0])
      } else {
        resolve(null)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  querySql,
  queryOne
}