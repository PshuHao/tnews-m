<template>
  <div id="app">

    <!-- 添加trasition路由过渡效果 -->
    <transition :name="direction">
      <keep-alive :include="cachePages">
        <router-view class="child-view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      direction: ''
    }
  },
  created () {
    // this.getTest()
  },
  computed: {
    ...mapState(['cachePages'])
  },
  methods: {},
  watch: {
    '$route' (to, from) {
      const fromIndex = from.meta.index
      const toIndex = to.meta.index
      if (from.meta.index) { this.direction = '' }
      if (from.meta.index && to.meta.index) {
        this.direction = fromIndex > toIndex ? 'slide-right' : 'slide-left'
        console.log('this.direction', this.direction)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 375px;
  height: 200px;
  background-color: skyblue;
}

// 路由过渡效果
</style>
