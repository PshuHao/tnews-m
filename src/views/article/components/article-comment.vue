<template>
  <div class="article-comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >

      <comment-item
        v-for="(item,index) in list"
        :key="index"
        :comment-itemdata="item"
      ></comment-item>

    </van-list>

  </div>
</template>

<script>
// 导入评论项组件
import CommentItem from '@/views/article/components/comment-item'
// 导入mapActions函数
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ArticleComment',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [String, Number, Object]
      // required: !this.replyShow
    },
    commentId: {
      type: [String, Number, Object]
      // required: this.replyShow
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      totalCount: 0
    }
  },
  mounted () {
    this.loading = true
    this.onLoad()
    this.updateList()
  },
  computed: {
    ...mapState(['loadCommentsList', 'addCommentList', 'replyShow', 'replyList']),
    ...mapGetters(['addCommentShow'])
  },
  watch: {},
  methods: {
    ...mapActions(['loadCommentSync']),

    async onLoad () {
      const resultsInfo = await this.loadCommentSync({
        type: this.replyShow ? 'c' : 'a',
        source: this.replyShow ? this.commentId.toString() : this.articleId,
        offset: this.offset,
        limit: this.limit
      })

      // console.log(this.list)
      // console.log(this.replyShow)
      // console.log(resultsInfo)

      this.loading = false

      resultsInfo.results.length ? this.offset = resultsInfo.last_id : this.finished = true
    },
    updateList () {
      this.list = this.replyShow ? this.replyList : this.loadCommentsList
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
