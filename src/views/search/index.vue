<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchInfo"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      v-if="resultShowFlag"
      :search-keyword="searchInfo"
    />

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchInfo"
      :parentSearchInfo="searchInfo"
    />

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :history-data="historyData"
      @search="onSearch"
    />

  </div>
</template>

<script>
// 导入search子组件
import SearchHistory from '@/views/search/components/search-history'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import SearchResult from '@/views/search/components/search-result'

import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      resultShowFlag: false,
      searchInfo: '',
      historyData: getItem('SEARCH_HISTORYS') || []
    }
  },
  created () {
  },
  methods: {
    onSearch (val) {
      this.searchInfo = val
      // console.log(val)
      // 存储搜索历史记录并去重，排序
      const index = this.historyData.indexOf(val)
      if (index !== -1) this.historyData.splice(index, 1)
      this.historyData.unshift(val)

      this.resultShowFlag = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    searchInfo: function (val) {
      if (val === '') this.resultShowFlag = false
    },
    // 历史记录存在到本地
    historyData (val) {
      // this.historyData
      setItem('SEARCH_HISTORYS', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    .van-search__content {
      border-radius: 40px;
    }
    .van-search__action {
      color: #fff;
    }
    .van-search__action:active {
      background-color: unset;
    }
  }
}
</style>
