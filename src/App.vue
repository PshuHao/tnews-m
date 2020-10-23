<template>
  <div id="app">
    <h2>
      TTnews
    </h2>
    <van-button
      round
      type="info"
    >圆形按钮</van-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // this.getTest()
  }
  // methods: {
  //   async getTest () {
  //     const { data: res } = await this.$http.get('/users')
  //     console.log(res)
  //   }
  // }
}
</script>

<style lang="sass" scoped>
.box
  width: 375px
  height: 200px
  background-color: skyblue
</style>
