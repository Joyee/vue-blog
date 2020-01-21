import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@router'

let loading = null

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/api',
  timeout: 30000
})

// 统计设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 常用http状态码
const statusCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

/*请求拦截器*/
instance.interceptors.request.use(config => {
  config.headers['token'] = sessionStorage.getItem('token') || ''
  loading = Loading.service({
    spinner: 'el-icon-loading',
    text: '加载中...'
  })

  return config
}, error => {
  return Promise.reject(error)
})

/*响应拦截器*/
instance.interceptors.response.use(response => {
  loading.close()
  if (response.data.code === 0) {
    return Promise.resolve(response.data)
  } else {
    Message({
      message: response.data.msg,
      type: 'fail'
    })
    return Promise.reject(response.data.msg)
  }
}, error => {
  loading.close()
  if (error.response) {
    let tips = error.response.status in statusCode ? statusCode[error.response.status] : error.response.data.message
    Message({
      message: tips,
      type: 'error'
    })
    if (error.response.status === 401) {
      router.replace({
        path: '/login'
      })
    }
    return Promise.reject(error)
  } else {
    Message({
      message: '请求超时，请刷新重试',
      type: 'error'
    })
    return Promise.reject(new Error('请求超时，请刷新重试'))
  }
})

/***
 * 封装get请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise<unknown>}
 */
export const get = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params: data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/***
 * 封装post请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise<unknown>}
 */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// export const post = (url, data, config = {}) => {
//   return instance({
//     method: 'post',
//     url,
//     data,
//     ...config
//   }).then(response => {
//     return Promise.resolve(response)
//   }).catch(error => {
//     return Promise.reject(error)
//   })
// }