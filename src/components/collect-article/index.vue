<template>
  <van-icon
    :name=" isCollected ? 'star' : 'star-o' "
    :color=" isCollected ? 'orange' : '#777'   "
    @click="onCollect"
  />
</template>

<script>
// 导入收藏文章的调用接口
import { collectArt, cancelCollectArt } from '@/api/user'

export default {
  name: 'CollectArticle',
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [String, Number, Object],
      required: true
    }
  },

  data () {
    return {}
  },
  created () { },
  methods: {
    async onCollect () {
      // console.log(window.localStorage.getItem('TNEWS_USER'))

      if (window.localStorage.getItem('TNEWS_USER') !== 'null') {
        try {
          if (!this.isCollected) {
            await collectArt(this.artId)
            this.$toast.success('收藏成功！')
          } else {
            await cancelCollectArt(this.artId)
            this.$toast.success('已取消收藏！')
          }
          this.$emit('updata-is-collected', !this.isCollected)
        } catch (err) {
          this.$toast.fail('操作失败，请重试！')
        }
      } else {
        this.$toast.fail('请登录后操作！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
