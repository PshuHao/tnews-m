<template>
  <div class="edit-gender">
    <van-picker
      title="标题"
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
// 导入编辑用户资料接口
// import {  } from '@/api/user'
import { mapActions } from 'vuex'
export default {
  name: 'EditGender',
  props: {
    PreGender: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.PreGender,
      localGender: 0
    }
  },
  created () {

  },
  watch: {},
  computed: {
    // ...mapState([''])
  },
  methods: {
    ...mapActions(['editUserProfileSync']),
    onConfirm () {
      this.editUserProfileSync({
        gender: this.localGender
      })
      this.$emit('close')
    },
    onChange (picker, value, index) {
      this.localGender = index
    },
    onCancel () {
      this.$emit('close')
    }

  }

}
</script>

<style lang="scss" scoped>
</style>
