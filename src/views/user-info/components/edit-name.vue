<template>
  <div class="edit-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="editUserName"
    />

    <!-- 文本修改区域 -->
    <van-field
      v-model.trim="nameIptVal"
      rows="5"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
// 导入编辑用户资料接口
import { editUserProfile } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'EditName',
  props: {
    PreName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nameIptVal: ''
    }
  },
  created () {
    this.nameIptVal = this.PreName
  },
  watch: {
    userEditName (val) {
      this.nameIptVal = val
    }
  },
  computed: {
    ...mapState(['userEditName'])
  },
  methods: {
    ...mapMutations(['updateName']),
    onClickLeft () {
      this.$emit('close-editNameShow')
      this.nameIptVal = this.userEditName
    },
    async editUserName () {
      try {
        const { data: res } = await editUserProfile({
          name: this.nameIptVal
        })
        console.log(res)
        this.updateName(this.nameIptVal)
        this.$emit('close-editNameShow')
        this.nameIptVal = ''
      } catch (err) {
        this.$toast('修改昵称失败，请稍后再试！')
        console.log(err)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
