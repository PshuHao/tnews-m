<template>
  <div class="article-list">
    <!-- article-list -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration=1000
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell
          v-for="item in list"
          :key="item.art_id"
          :title="item.title"
        /> -->
        <article-item
          v-for="item in list"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index'

export default {
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  created () {},
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })

        // if (Math.random() > 0.5) {
        //   JSON.parse('jiefji')
        // }
        const { results } = res.data
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        this.list.unshift(...res.data.results)
        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${res.data.results.length}条数据`
      } catch (err) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
