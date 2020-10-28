<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败,请点击重试"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// 导入获取搜索结果
import { getSearchResult } from '@/api/user'

export default {
  name: 'SearchResult',
  props: {
    searchKeyword: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
    // 异步更新获取搜索结果
      try {
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchKeyword
        })
        // console.log(res)
        this.list.push(...res.data.results)
        // 加载状态结束
        this.loading = false
        // 判断数据是否加载完毕，加载完成后页码加1
        res.data.results.length ? this.page++ : this.finished = true
        // if (res.data.results.length) this.page++
        // 异步搜索结果全部完成(结果总数控制在50条内)
        if (this.list.length > 50) this.finished = true
      } catch (err) {
        this.error = true
        this.$toast('获取搜索数据失败，请稍后重试')
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
