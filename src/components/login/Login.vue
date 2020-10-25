<template>
  <div>
    <!-- banner区域 -->
    <van-nav-bar
      class="page-nav-var"
      title="登录"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- 登录验证表单 -->
    <van-form
      ref="loginFormRef"
      @submit="onSubmit"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="用户名"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i
          slot="left-icon"
          class="iconfont iconshouji"
        ></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入短信验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i
          slot="left-icon"
          class="iconfont iconyanzhengma"
        ></i>
        <template #button>
          <van-count-down
            class="count-down-box"
            v-if="countDownFlag"
            :time="10*1000"
            format="ss s"
            @finish="countDownFlag=false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="mini"
            type="default"
            native-type="button"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">

        <van-button
          text="登录"
          round
          class="login-btn"
          :loading="isLoadingFlage"
          type="primary"
          loading-type="spinner"
          native-type="submit"
        />
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  data () {
    return {
      isLoadingFlage: false,
      countDownFlag: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /\d{6}/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 0
      // })
      this.isLoadingFlage = true

      try {
        const { data: res } = await login(this.user)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        this.isLoadingFlage = false
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败！', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
        this.isLoadingFlage = false
        this.$toast.fail('登录失败，请稍后重试')
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginFormRef.validate('mobile')
        console.log('验证通过')
      } catch (err) { return console.log('验证失败', err) }
      // 验证通过，启动倒计时
      this.countDownFlag = true

      try {
        const res = await sendSms(this.user.mobile)
        console.log('验证码已发送', res)
        this.$toast('发送成功！')
      } catch (err) {
        this.countDownFlag = false
        if (err.response.status === 429) {
          this.$toast('发送过于频繁，请稍后再试！')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar {
  color: #ffffff;
  background-color: #3296fa;
}
.iconfont {
  &.iconshouji {
    font-size: 37px;
  }
  &.iconyanzhengma {
    font-size: 37px;
  }
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  color: #666666;
  background-color: #ededed;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    width: 100%;
    background-color: #6db4fb;
    border: none;
  }
}
.count-down-box {
  width: 152px;
  height: 46px;
  text-align: center;
}
</style>
