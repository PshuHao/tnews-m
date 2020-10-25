import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 在axios发请求前通过拦截器添加token
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
export default request
