<template>
  <div class="layout-container">
    <!-- 路由占位符 -->
    <router-view />

    <!-- 标签导航栏 -->
    <van-tabbar
      class="layout-navbar"
      route
    >
      <van-tabbar-item to="/">
        <i
          slot="icon"
          class="iconfont iconshouye"
        ></i>
        <span class="barText">
          首页
        </span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i
          slot="icon"
          class="iconfont iconwenda"
        ></i>
        <span class="barText">
          问答
        </span>
      </van-tabbar-item>
      <van-tabbar-item to='/video'>
        <i
          slot="icon"
          class="iconfont iconshipin"
        ></i>
        <span class="barText">
          视频
        </span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <i
          slot="icon"
          class="iconfont iconwode"
        ></i>
        <span class="barText">
          {{ $store.state.user? '我的':'未登录'}}
        </span>
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {}
  },
  mounted () {
    this.$store.commit('addCachePages', 'LayoutIndex')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.layout-navbar {
  i.iconfont {
    font-size: 35px;
  }
  span.barText {
    font-size: 20px;
  }
}
</style>
