<template>

  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="个人中心"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 用户信息区域 -->

    <!-- 文件上传按钮 隐藏-->
    <input
      type="file"
      hidden
      ref="file"
      @change="fileChange"
    >
    <!-- 文件上传按钮 -->

    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
    >
      <van-image
        round
        class="avatar"
        fit="cover"
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      @click="nameShow=true"
      :value="userProfile.name"
    />

    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender===1?'女':'男'"
      @click="genderShow=true"
    />
    <van-cell
      title="生日"
      is-link
      :value="birthdayUpdate"
      @click="birthdayShow=true"
    />

    <!-- 头像弹出层 -->
    <van-popup
      v-model="avatarShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <edit-avatar
        v-if="avatarShow"
        :img-path="imgUrlInfo"
        @close="avatarShow=false"
        @update-photo="userProfile.photo=$event"
      ></edit-avatar>
    </van-popup>

    <!-- 昵称弹出层 -->
    <van-popup
      v-model="nameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <edit-name
        :pre-name="userProfile.name"
        @close-editNameShow="nameShow=false"
      ></edit-name>
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup
      v-model="genderShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <edit-gender
        v-if="genderShow"
        @close="genderShow=false"
        :pre-gender="userProfile.gender"
      />
    </van-popup>

    <!-- 生日弹出层 -->
    <van-popup
      v-model="birthdayShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <edit-birthday
        v-if="birthdayShow"
        @close="birthdayShow=false"
        :pre-birthday="birthdayUpdate"
        @inputBirthday="birthdayUpdate=$event"
      />
    </van-popup>
  </div>

</template>

<script>

// 导入修改名称组件
import EditName from '@/views/user-info/components/edit-name'
// 导入修改性别组件
import EditGender from '@/views/user-info/components/edit-gender'
// 导入修改性别组件
import EditBirthday from '@/views/user-info/components/edit-birthday'
// 导入修改性别组件
import EditAvatar from '@/views/user-info/components/edit-avatar'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserInfo',
  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditAvatar
  },
  props: {
    // userId: {
    //   type: [Number, String, Object],
    //   required: true
    // }
  },
  data () {
    return {
      avatarShow: false,
      userProfile: {},
      nameShow: false,
      updateName: '',
      genderShow: false,
      birthdayShow: false,
      birthdayUpdate: '',
      imgUrlInfo: ''

    }
  },
  computed: {
    ...mapState(['userProfileList', 'userEditName'])
  },
  watch: {
    userEditName (val) {
      this.userProfile.name = val
    }
  },
  async created () {
    await this.getUserProfileSync()
    this.userProfile = this.userProfileList
    this.birthdayUpdate = this.userProfile.birthday
    this.imgUrlInfo = this.userProfileList.photo
    console.log('created -> this.userProfile', this.userProfile)
    // this.updateName = this.userProfile.name
  },
  mounted () {},
  methods: {
    ...mapActions(['getUserProfileSync']),
    // 图片上传处理
    fileChange () {
      const fileData = window.URL.createObjectURL(this.$refs.file.files[0])
      this.imgUrlInfo = fileData
      this.avatarShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .page-nav-bar {
    background-color: #2892ff;
  }
}
</style>
