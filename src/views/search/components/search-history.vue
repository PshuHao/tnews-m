<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- <van-icon
        name="delete"
        v-if="!delBtnShow"
        @click="delBtnShow=true"
      /> -->
      <van-button
        icon="delete"
        type="default"
        size="mini"
        round
        v-if="!delBtnShow"
        @click="delBtnShow=true"
      />
      <!-- <span v-show="delBtnShow">全部删除</span> -->
      <van-button
        plain
        size="mini"
        type="danger"
        v-show="delBtnShow"
        @click="historyData.splice(0,historyData.length)"
      >全部删除</van-button>
      <van-button
        plain
        size="mini"
        type="info"
        v-show="delBtnShow"
        @click="delBtnShow=false"
      >完成</van-button>
      <!-- <span
        v-show="delBtnShow"
        @click="delBtnShow=false"
      >完成</span> -->
    </van-cell>
    <van-cell
      v-for="(v,i) in historyData"
      :key="i"
      :title="v"
      @click="onHistoryItem(v)"
    >
      <van-icon
        v-show="delBtnShow"
        name="close"
        @click="delHistory(v)"
      />
    </van-cell>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    historyData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      localHistory: [],
      delBtnShow: false
    }
  },
  created () {},
  methods: {
    delHistory (val) {
      this.historyData.splice(this.historyData.indexOf(val), 1)
    },
    onHistoryItem (item) {
      // if (this.delBtnShow) {
      //   this.historyData.splice(this.historyData.indexOf(item), 1)
      // } else {
      //   this.$emit('search', item)
      // }

      // 三元表达式简化
      this.delBtnShow ? this.historyData.splice(this.historyData.indexOf(item), 1) : this.$emit('search', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-history {
  margin-top: 108px;
  .van-button {
    line-height: unset;
  }
}
</style>
