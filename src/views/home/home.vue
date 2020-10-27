<template>
  <div class="home-container">
    <!-- banner区域 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 标签页列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
      swipe-threshold="3"
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
      </van-tab>

      <div
        slot="nav-right"
        class="placholder"
      ></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="showHamburgerBtn=true"
      >
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="showHamburgerBtn"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%' }"
      class="popupHamburger"
    >
      <!-- //channelEdit组件 -->
      <channel-edit
        :channel="channels"
        :active-index.sync="active"
        @update-active="onUpdateActive"
      ></channel-edit>

    </van-popup>
  </div>
</template>

<script>
import { getChannelList } from '@/api/user'
// 导入ArticleList组件
import ArticleList from './components/article-list'
// 导入channelEdit组件
import channelEdit from './components/channel-edit'
// 导入store共享数据方法
import { mapState } from 'vuex'

import { getItem } from '@/utils/storage'

export default {
  components: {
    ArticleList,
    channelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      showHamburgerBtn: false
    }
  },
  created () {
    this.loadChannelList()
  },
  methods: {
    async loadChannelList () {
      try {
        if (this.user) {
          const { data: res } = await getChannelList()
          this.channels = res.data.channels
        } else {
          if (getItem('TNEWS_CHANNELS')) {
            this.channels = getItem('TNEWS_CHANNELS')
          } else {
            const { data: res } = await getChannelList()
            this.channels = res.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取频道数据失败')
        console.log('获取频道数据失败', err)
      }
    },
    onUpdateActive (index, showHamburgerBtn = true) {
      this.active = index
      this.showHamburgerBtn = showHamburgerBtn
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .page-nav-bar {
    background-color: #3296fa;
    ::v-deep .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-button__icon {
        font-size: 32px;
      }
    }
  }

  ::v-deep .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 28px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
      font-size: 30px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.icongengduo {
        font-size: 40px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: url(../../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }

  .popupHamburger {
    .channel-edit {
      margin-top: 100px;
      // .i-channel {
      //   .i-channel-title {
      //     span {
      //       color: #333333;
      //       font-size: 32px;
      //     }
      //     .i-channel-titleBtn {
      //       width: 104px;
      //       height: 48px;
      //       line-height: 0;
      //       .van-button__text {
      //         color: #f96969;
      //         font-size: 26px;
      //       }
      //     }
      //   }
      // }
    }
  }
}
</style>
