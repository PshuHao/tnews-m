import CommentItem from '@/views/article/components/comment-item';
<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      round
      fit="cover"
      width="30"
      height="30"
      style="margin-right: 10px;"
      :src="commentItemdata.aut_photo"
    />
    <span
      slot="title"
      class="comment-username"
    >{{commentItemdata.aut_name}}</span>
    <div slot="label">
      <p class="comment-content">{{commentItemdata.content}}</p>
      <p>
        <span class="comment-pubdate">{{commentItemdata.pubdate | relativeTime}}</span>
        <van-button
          class="comment-btn"
          round
          size="mini"
          @click="popUpReply(commentItemdata.com_id)"
        >
          <!-- 回复 {{commentItemdata.reply_count}} -->
          回复 {{ this.replyCommentIdNow === this.commentItemdata.com_id? replyTotal:loadReplyTotal}}
          <!-- 回复 {{ loadCommentTotal}} -->
        </van-button>
      </p>
    </div>
    <!-- <van-icon
          slot="right-icon"
          name="good-job-o"
        ></van-icon> -->
    <van-button
      :class=" commentItemdata.is_liking ? 'like-btn active' : 'like-btn' "
      :icon=" commentItemdata.is_liking ? 'good-job': 'good-job-o' "
      @click="onCommentLike"
      :loading="loading"
    >{{commentItemdata.like_count || '赞'}}</van-button>
  </van-cell>
</template>

<script>
// 导入点赞及取消点赞接口调用方法
import { addCommentLike, delCommentLike } from '@/api/comment'
import { mapMutations, mapState } from 'vuex'
export default {
  // name: 'CommentcommentItemdata',
  name: 'CommentItem',
  props: {
    commentItemdata: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      loadReplyTotal: this.commentItemdata.reply_count
    }
  },
  created () {},
  computed: {
    ...mapState(['replyTotal', 'replyCommentIdNow', 'replyShow', 'loadCommentTotal'])
  },
  watch: {
    // replyTotal (val) {
    //   if (this.replyCommentIdNow.toString() === this.commentItemdata.com_id.toString()) {
    //     this.loadReplyTotal = val
    //   }
    // }
  },
  methods: {
    ...mapMutations(['popUpReply']),

    async onCommentLike () {
      if (window.localStorage.getItem('TNEWS_USER') !== 'null') {
        this.loading = true
        try {
          if (!this.commentItemdata.is_liking) {
            await addCommentLike(this.commentItemdata.com_id.toString())
            this.commentItemdata.like_count++
          } else {
            await delCommentLike(this.commentItemdata.com_id.toString())
            this.commentItemdata.like_count--
          }
        } catch (err) {
          console.log(err)
          this.$toast('操作失败，请重试！')
        }
      } else {
        return this.$toast('请登录后操作！')
      }
      this.commentItemdata.is_liking = !this.commentItemdata.is_liking
      this.loading = false
    },
    ontest () {
      console.log(this.commentItemdata.com_id.toString())
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-item {
  .comment-content {
    color: #222;
    font-size: 30px;
  }
  .comment-username {
    color: #406599;
  }
  .comment-pubdate {
    margin-right: 26px;
  }
  .comment-btn {
    width: 124px;
    height: 48px;
    border: 1px solid #ebedf0 !important;
  }
  .van-button--default {
    border: unset;
  }
  .van-cell__title {
    .van-cell__label {
      line-height: 50px;
    }
  }
  .van-cell__value {
    .van-button:active::before {
      opacity: 0;
    }
  }
  .like-btn {
    &.active {
      color: red;
    }
  }
}
</style>
