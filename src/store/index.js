import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/storage'

import { getComments, getUserProfile, editUserProfile } from '@/api/user'

import { addComment } from '@/api/comment'

const TOKEN_KEY = 'TNEWS_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cachePages: ['LayoutIndex'],
    user: getItem(TOKEN_KEY),
    // article-comment文件评论数据
    articleData: {},
    loadCommentsList: [],
    // loadCommentsObj: {},
    loadCommentTotal: 0,
    // addCommentList: []
    commentShow: false,
    replyShow: false,
    popUpReplyItem: {},
    replyList: [],
    replyTotal: 0,
    replyCommentShow: false,
    replyCommentIdNow: {},

    // 用户个人资料区域
    userProfileList: {},
    userEditName: '',
    userEditGender: 0
    // editNameShow: false
  },
  mutations: {
    // 缓存处理
    addCachePages (state, page) {
      if (!state.cachePages.includes(page)) {
        state.cachePages.push(page)
      }
    },
    delCachePages (state, page) {
      const index = state.cachePages.indexOf(page)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    },

    setUser (state, user) {
      state.user = user

      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    removeUser (state, user) {
      // state.user = ''
      removeItem(TOKEN_KEY)
    },
    setArtData (state, res) {
      state.articleData = res.data
    },
    loadCommentsData (state, data) {
      if (state.replyShow) {
        console.log(data)
        state.replyList.push(...data.results)
        state.replyTotal = data.total_count
      } else {
        state.loadCommentsList.push(...data.results)
        state.loadCommentTotal = data.total_count
      }
    },
    addCommentData (state, data) {
      if (state.replyShow) {
        state.replyList.unshift(data.new_obj)
        state.replyTotal++
        state.replyCommentShow = !state.replyCommentShow
        state.replyCommentIdNow = data.com_id
      } else {
        state.loadCommentsList.unshift(data.new_obj)
        state.loadCommentTotal++
        state.commentShow = !state.commentShow
      }
    },
    ChangeCommentShow (state) {
      state.commentShow = !state.commentShow
    },
    popUpReply (state, comId) {
      if (state.replyShow) {
        return
      }
      state.replyShow = !state.replyShow
      state.popUpReplyItem = state.loadCommentsList.filter(v => v.com_id === comId)[0]
    },
    closePopUpReply (state) {
      state.replyShow = !state.replyShow
      state.replyList = []
    },
    updaReplyIdNow (state, data) {
      state.replyCommentIdNow = data
    },
    closeArticle (state) {
      state.loadCommentsList = []
    },
    // 用户个人资料区域
    getUserProfileData (state, data) {
      state.userProfileList = { ...data }
    },
    updateName (state, name) {
      state.userEditName = name
    },
    updateGender (state, data) {
      state.userEditGender = data.gender
    }

  },
  actions: {
    // 获取用户评论列表数据
    async loadCommentSync (context, params) {
      try {
        const { data: res } = await getComments(params)
        console.log(res)
        context.commit('loadCommentsData', res.data)
        return res.data
      } catch (err) { console.log(err) }
    },
    // 调用接口添加评论
    async addCommentApi (context, data) {
      try {
        const { data: res } = await addComment(data)
        console.log(res)
        context.commit('addCommentData', res.data)
      } catch (err) { console.log(err) }
    },
    // 调用接口查询个人用户资料
    async getUserProfileSync (context) {
      try {
        const { data: res } = await getUserProfile()
        console.log(res)
        context.commit('getUserProfileData', res.data)
      } catch (err) { console.log(err) }
    },
    // 调用接口查询个人用户资料
    async editUserProfileSync (context, data) {
      try {
        const { data: res } = await editUserProfile(data)
        console.log(res)
        context.commit('updateGender', res.data)
      } catch (err) { console.log(err) }
    }
  },
  getters: {
    // 评论徽标总数
    commentsTotal: state => state.loadCommentTotal
    // 新添加的评论对象
    // addCommentShow: state => state.addCommentList
  },
  modules: {
  }

})
