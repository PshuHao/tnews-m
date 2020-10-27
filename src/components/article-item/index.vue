<template>
  <van-cell
    class="article-item"
    label="描述信息"
  >
    <!-- 文章标题 -->
    <div
      slot="title"
      class="title-text van-multi-ellipsis--l2"
    >{{article.title}}</div>

    <div slot="label">
      <!-- 三张图片模式 -->
      <div
        v-if="article.cover.type===3"
        class="cover-ThreeImg"
      >
        <div
          class="cover-item"
          v-for="(item,index) in article.cover.images"
          :key="index"
        >
          <van-image
            fit="cover"
            class="bottom-cover"
            :src="item"
          />
        </div>
      </div>
      <!-- 文章底部信息展示 -->
      <div class="bottom-text">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 一张图片模式 -->
    <van-image
      v-if="article.cover.type===1"
      slot="default"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
      round
      width="70"
      height="70"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articleData: []
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  padding: 25px 23px 30px;
  .title-text {
    color: #3a3a3a;
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 26px;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .cover-ThreeImg {
    display: flex;
    margin-top: 29px;
    // width: 100%;
    // justify-content: center;
    .cover-item:nth-child(2) {
      margin: 0 4px;
    }
    .cover-item {
      flex: 1;
      width: 232px;
      // height: 146px;
      .bottom-cover {
        width: 100%;
        height: 146px;
        ::v-deep .van-image__img {
          border-radius: 6px;
        }
      }
    }
  }
  .bottom-text {
    color: #b4b4b4;
    font-size: 23px;
    span:nth-child(2) {
      margin: 0 26px;
    }
  }
}
</style>
