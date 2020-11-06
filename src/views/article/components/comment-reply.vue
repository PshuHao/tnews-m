<template>
  <div class="reply-container">
    <!-- 头部导航 -->
    <van-nav-bar :title=" replyTotal+' 回复' ">
      <van-icon
        slot="left"
        name="cross"
        @click="closePopUpReply"
      ></van-icon>
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 评论项 -->
      <comment-item :comment-itemdata="popUpReplyItem"></comment-item>

      <van-cell title="全部回复" />
      <!-- 评论回复列表 -->
      <article-comment :comment-id="popUpReplyItem.com_id"></article-comment>

    </div>

    <!-- 写评论 -->
    <div class="post-wrap">
      <van-button
        class="post-btn"
        size="small"
        round
        @click="isreplyToCommentShow=true"
      >写评论</van-button>

      <!-- 对回复进行评论 -->
      <van-popup
        class="replyToComment"
        v-model="isreplyToCommentShow"
        position="bottom"
      >
        <comment-post :comment-id="popUpReplyItem.com_id" />
      </van-popup>
    </div>
  </div>
</template>

<script>
// 导入评论项
import { mapMutations, mapState } from 'vuex'
// 评论项组件
import CommentItem from '@/views/article/components/comment-item'
// 评论回复列表组件
import ArticleComment from '@/views/article/components/article-comment'
// 弹窗评论组件
import CommentPost from '@/views/article/components/comment-post'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    ArticleComment,
    CommentPost
  },
  data () {
    return {
      isreplyToCommentShow: false
      // ReplyItemData: [this.popUpReplyItem]
    }
  },
  created () {
    console.log(this.popUpReplyItem)
  },
  watch: {
    replyCommentShow (val) {
      this.isreplyToCommentShow = !this.isreplyToCommentShow
    }
  },
  computed: {
    ...mapState(['popUpReplyItem', 'replyCommentShow', 'replyTotal'])
  },
  methods: {
    ...mapMutations(['closePopUpReply'])
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
