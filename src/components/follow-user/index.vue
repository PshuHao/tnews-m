<template>
  <van-button
    :loading="isLoadingFlage"
    loading-type="circular"
    class="follow-btn"
    :icon=" isFollowed ? '' : 'plus'"
    :type=" isFollowed ? 'danger' : 'primary'"
    size="small"
    round
    :text=" isFollowed ? '已关注' : '关注'"
    @click="followUser(userId)"
  />
</template>

<script>
// 导入关注/取消关注用户接口调用方法
import { followUserApi, cancelFollowApi } from '@/api/user'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isLoadingFlage: false
    }
  },
  methods: {
    async followUser (autId) {
      this.isLoadingFlage = true
      try {
        if (!this.isFollowed) {
          const { data: res } = await followUserApi(autId)
          console.log(res)
          this.$toast('关注成功！')
        } else {
          await cancelFollowApi(autId)
          this.$toast('已取消关注！')
        }
        this.$emit('update-is-followed', !this.isFollowed)
      } catch (err) {
        this.$toast.fail('操作失败！')
        console.log(err)
      }
      this.isLoadingFlage = false
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
