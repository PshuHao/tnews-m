<template>
  <div class="my-container">

    <!-- 已登录模块 -->
    <div
      v-if="user"
      class="header user-info"
    >
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>

      </div>
    </div>

    <!-- 未登录模块 -->
    <div
      v-else
      class="header not-login"
    >
      <div
        class="login-btn"
        @click="$router.push('/login')"
      >
        <img
          class="notLoginImg"
          src="../../assets/mobile.png"
          alt=""
        >
        <span>登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <!-- <div class="action-nav">
      <div
        class="collect action-item"
        @click="$router.push('/login')"
      >
        <span class="color-icon">
          <van-icon
            name="star-o"
            color="#eb5253"
          />
        </span>
        <span class="text">收藏</span>
      </div>
      <div class="history action-item">
        <span class="color-icon">
          <van-icon
            name="todo-list-o"
            color="#ff9d1d"
          />
        </span>
        <span class="text">历史</span>
      </div>
    </div> -->

    <!-- 宫格导航 -->
    <van-grid
      class="action-nav"
      clickable
      column-num="2"
    >
      <van-grid-item class="action-item">
        <i
          slot="icon"
          class="iconfont iconshoucang"
        ></i>
        <span
          slot="text"
          class="text"
        >收藏</span>
      </van-grid-item>
      <van-grid-item class="action-item">
        <i
          slot="icon"
          class="iconfont iconlishi"
        ></i>
        <span
          slot="text"
          class="text"
        >历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知列表 -->
    <div class="messageList">
      <van-cell
        class="listItem"
        is-link
        @click="showPopup=true"
      >消息通知</van-cell>
      <van-popup
        v-model="showPopup"
        round
        position="bottom"
        :style="{ height: '60%' }"
        closeable
      ></van-popup>

      <van-cell
        class="listItem"
        is-link
        @click="showPopup=true"
      >小智同学</van-cell>
      <van-popup
        v-model="showPopup"
        round
        position="bottom"
        :style="{ height: '60%' }"
        closeable
      ></van-popup>

      <van-cell
        class="listItem"
        is-link
        @click="showPopup=true"
      >实名认证</van-cell>
      <van-popup
        v-model="showPopup"
        round
        position="bottom"
        :style="{ height: '60%' }"
        closeable
      ></van-popup>
    </div>

    <!-- 退出登录 -->
    <van-cell
      class="logout-cell"
      v-if="user"
      @click="logout"
      title="退出登录"
      clickable
    ></van-cell>
    <!-- <van-popup v-model="showExit">内容</van-popup> -->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      showPopup: false,
      showExit: false,
      userInfo: {}
    }
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '是否确认退出登录？'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$toast.success('退出登录成功')
      }).catch(() => {
        this.$toast.success('已取消')
      })
    },
    async loadUserInfo () {
      // console.log(this.$store.state.user.token)
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (err) {
        this.$toast('获取数据失败，请重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.my-container {
  .header {
    background: url("../../assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login {
    .login-btn {
      height: 361px;
      // background-color: skyblue;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .notLoginImg {
        width: 132px;
        height: 132px;
      }
      span {
        color: #d7e7fe;
        font-size: 28px;
        margin-top: 16px;
      }
    }
  }

  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      // background-color: skyblue;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 3px solid #fff;
        }
        span {
          color: #fff;
          font-size: 30px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        .van-button {
          color: #8c8c8c;
          font-size: 20px;
          line-height: 0;
        }
        // .van-button__content {
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        // }
      }
    }
    .data-stats {
      display: flex;
      // background-color: purple;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .action-nav {
    .action-item {
      i.iconfont {
        font-size: 45px;
      }
      span.text {
        font-size: 28px;
      }
      .iconshoucang {
        color: #eb5253;
      }
      .iconlishi {
        color: #ff9d1d;
      }
    }
  }

  .messageList {
    margin-top: 9px;
    .listItem {
      height: 100px;
      font-size: 30px;
    }
  }
  .logout-cell {
    color: #d86262;
    font-size: 30px;
    text-align: center;
    height: 104px;
    line-height: 65px;
    margin-top: 9px;
    // display: table-cell;
    // vertical-align: middle;
    // width: 750px;
    .van-cell__title {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
