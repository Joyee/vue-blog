module.exports = {
  mysql: {
    hostname: 'localhost',
    user: process.env.NODE_ENV === 'production' ? 'xiaofengfeng' : 'root',
    password: process.env.NODE_ENV === 'production' ? 'Qxf1234,?' : '496329207',
    database: 'blog',
    port: 3306,
  }
}