// SQL语句映射文件 供api逻辑调用
const sqlMap = {
  user: {
    add: 'INSERT INTO user(username, password, age) values (?, ?, ?)',
    queryByNamePassword: 'SELECT * FROM user WHERE username=? and password=?',
    updateUser: 'UPDATE user set ? where username=?',
    deleteUser: 'DELETE FROM user where username=?',
    query: 'SELECT ID, USERNAME FROM user WHERE username=?',
  }
}

module.exports = sqlMap
