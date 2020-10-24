<template>
  <div id="app">

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // this.getTest()
  },
  methods: {
    // async getTest () {
    //   const { data: res } = await this.$http.get('/users')
    //   console.log(res)
    // }

  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 375px;
  height: 200px;
  background-color: skyblue;
}
</style>
