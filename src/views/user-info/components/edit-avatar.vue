<template>
  <div class="edit-avatar">

    <img
      class="avatarImg"
      :src="imgPath"
      ref="img"
    >

    <div class="editBar">
      <div
        class="cancel"
        @click="$emit('close')"
      >取消</div>
      <div
        class="done"
        @click="upLoad"
      >完成</div>
    </div>
  </div>
</template>

<script>
// 导入编辑用户资料接口
// import {  } from '@/api/user'
// import { mapActions } from 'vuex'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserImg } from '@/api/user'

export default {
  name: 'EditAvatar',
  props: {
    imgPath: {
      type: [String, Array],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    console.log(this.cropper)
  },
  watch: {},
  computed: { },
  methods: {
    upLoad () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          duration: 0
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)

          const { data: res } = await editUserImg(formData)
          console.log(res)
          this.$emit('close')
          this.$emit('update-photo', res.data.photo)

          this.$toast.success('更新成功！')
        } catch (err) {
          this.$toast.fail('更新失败！')
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.edit-avatar {
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  .avatarImg {
    display: block;
    max-width: 100%;
  }
  .editBar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    div {
      color: white;
      font-size: 30px;
      width: 90px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      padding: 30px;
    }
  }
}
</style>
