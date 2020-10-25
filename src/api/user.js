import request from '@/utils/request'
// import store from '@/store'

// 请求登录
export const login = data => {
  return request({
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + mobile
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}
