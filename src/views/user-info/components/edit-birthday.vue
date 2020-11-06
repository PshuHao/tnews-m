<template>
  <div class="edit-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
// 导入编辑用户资料接口
import { editUserProfile } from '@/api/user'
// import { mapActions } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'EditBirthday',
  props: {
    preBirthday: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.preBirthday)
    }
  },
  created () {

  },
  watch: {},
  computed: {
    // ...mapState([''])
  },
  methods: {
    async  onConfirm () {
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        const { data: res } = await editUserProfile({
          birthday: currentDate
        })
        console.log(res)
        this.$emit('inputBirthday', currentDate)
        this.$emit('close')
        // this.currentDate = currentDate
      } catch (err) { console.log(err) }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
