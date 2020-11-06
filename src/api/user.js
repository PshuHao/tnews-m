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

// 获取文章详情，根据文章id
export const getArtdetail = artId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${artId}`
  })
}

// 关注用户
export const followUserApi = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const cancelFollowApi = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 收藏文章
export const collectArt = artId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: artId
    }
  })
}

// 取消收藏文章
export const cancelCollectArt = artId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${artId}`
  })
}
// 点赞文章
export const onGoodJob = artId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: artId
    }
  })
}

// 取消点赞文章
export const cancelGoodJob = artId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${artId}`
  })
}

// 获取评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 获取用户个人资料
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 编辑用户个人资料
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
// 编辑用户头像或身份证资料
export const editUserImg = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
