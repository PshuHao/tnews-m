<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(v,i) in suggestions"
      :key="i"
      :title="v"
      icon="search"
      @click="getRerults"
    >
      <div
        slot="title"
        v-html="hightLight(v,parentSearchInfo)"
      ></div>
    </van-cell>
  </div>
</template>

<script>
// 导入联想建议方法
import { getSuggestion } from '@/api/user'
// 导入lodash
import { debounce } from 'lodash'
// import func from 'vue-temp/vue-editor-bridge'

export default {
  name: 'SearchSuggestion',
  props: {
    parentSearchInfo: {
      type: String,
      required: true
    }
  },
  created () {
    // console.log(this.parentSearchInfo)
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    parentSearchInfo: {
      // 防抖处理
      handler: debounce(async function (val) {
        try {
          const { data: res } = await getSuggestion(val)
          // console.log(res)
          this.suggestions = res.data.options
        } catch (err) { console.log(err) }
      }, 200),
      immediate: true
    }

  },
  methods: {
    hightLight (source, keyword) {
      const reg = new RegExp(keyword, 'gi')
      return source.replace(reg, `<span style="color: #3296fa">${keyword}</span>`)
    },
    getRerults () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
