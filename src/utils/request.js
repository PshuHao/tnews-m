import axios from 'axios'
import store from '@/store/index'
import { Toast } from 'vant'

// 导入jsonbig插件
import JSONBig from 'json-bigint'
import router from '@/router/index'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
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

// 处理失败请求
request.interceptors.response.use(response => {
  return response
}, async error => {
  // console.dir(error)
  const errStatus = error.response.status
  if (errStatus === 400) {
    Toast.fail('请求参数错误！')
    // 请求参数错误
  } else if (errStatus === 401) {
    // 无效token
    const { user } = store.state
    if (!user || !user.token) {
      return toLoginPage()
    }

    // 如果原告浏览器已经有user的token信息，说明已过期，需要通过refresh_token发起请求进行更新
    try {
      const { data: res } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(res)
      // 请求返回的新token更新到store中
      user.token = res.data.token
      store.commit('setUser', user)
      // 通过request从store中拿到更新的token重新发起请求
      return request(error.config)
    } catch (err) {
      toLoginPage()
    }
  } else if (errStatus === 403) {
    // 权限问题
  } else if (errStatus >= 500) { }
  // 服务端问题
  return Promise.reject(error)
})

function toLoginPage () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
