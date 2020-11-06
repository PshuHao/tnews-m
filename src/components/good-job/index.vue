<template>
  <van-icon
    :name=" attitudeVal ===1 ?    'good-job' : 'good-job-o'  "
    :color=" attitudeVal ===1 ?    'orangered' :  '#777' "
    @click="onGoodJob"
  />
</template>

<script>
import { onGoodJob, cancelGoodJob } from '@/api/user'

export default {
  name: 'GoodJob',
  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    },
    attitudeVal: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      goodJobFlag: false
    }
  },
  created () {},
  methods: {
    async onGoodJob () {
      if (window.localStorage.getItem('TNEWS_USER') !== 'null') {
        try {
          if (this.attitudeVal !== 1) {
            await onGoodJob(this.artId)
            this.$toast.success('点赞成功！')
            this.$emit('update-attitude', 1)
          } else {
            await cancelGoodJob(this.artId)
            this.$toast('点赞已取消！')
            this.$emit('update-attitude', -1)
          }
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
