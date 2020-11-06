<template>
  <div class="comment-post">
    <van-field
      v-model.trim="iptCommentVal"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
      border
    ></van-field>
    <van-button
      plain
      size="small"
      type="info"
      :disabled="!iptCommentVal"
      @click="addCommnetBtn"
    >发布</van-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CommentPost',
  props: {
    artData: {
      type: [Object, Array]
      // required: !this.replyShow
    },
    commentId: {
      type: [String, Number, Object]
      // required: this.replyShow
    }
  },
  data () {
    return {
      commentChangeFlag: false,
      // commentVal: '',
      iptCommentVal: ''
    }
  },
  created () {},
  computed: {
    ...mapState(['commentShow', 'articleData', 'replyShow'])
  },
  methods: {
    ...mapMutations(['ChangeCommentShow', 'updaReplyIdNow']),
    async addCommnetBtn () {
      await this.$store.dispatch('addCommentApi', {
        target: this.replyShow ? this.commentId : this.artData.art_id,
        content: this.iptCommentVal,
        art_id: this.replyShow ? this.articleData.art_id : null
      })
      this.updaReplyIdNow(this.commentId)
      this.$toast.success('发布成功！')
      this.iptCommentVal = ''
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 30px 0 30px 30px;
  .van-field {
    width: 260%;
    line-height: 65px;
    background-color: #f5f7f9;
  }
  .van-button {
    line-height: unset;
    width: 290px;
    height: 82px;
    border: unset;
    font-size: 35px;
  }
}
</style>
