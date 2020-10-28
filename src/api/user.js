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

// 获取用户频道列表
export const getChannelList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}

// 获取所有用户频道列表
export const getAllChannelList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

// 删除用户频道
export const delUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}

// 获取联想建议（自动补全）
export const getSuggestion = val => {
  return request({
    method: 'GET',
    // url: `/app/v1_0/suggestion?q=${val}`
    url: '/app/v1_0/suggestion',
    params: {
      q: val
    }
  })
}

// 获取搜索结果
export const getSearchResult = queryData => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: queryData
  })
}
