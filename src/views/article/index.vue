<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="INEWS"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main-wrap">
      <!-- 加载中提示 -->
      <div
        class="loading-wrap"
        v-if="loadFlag"
      >
        <van-loading
          color="#1989fa"
          vertical
          size="70px"
        />
      </div>

      <!-- 文章详情 -->
      <div
        class="article-detail"
        v-else-if="artDetails.title"
      >
        <!-- 文章标题 -->
        <h1 class="art-title">{{artDetails.title}}</h1>
        <!-- 用户信息 -->
        <van-cell
          class="user-info"
          value="on"
        >
          <div
            slot="title"
            class="user-left"
          >
            <van-image
              class="user-avatar"
              round
              fit="cover"
              :src="artDetails.aut_photo"
            />
            <div class="user-info-text">
              <span class="user-name">{{artDetails.aut_name}}</span>
              <span class="pub-date">{{artDetails.pubdate}}</span>
            </div>
          </div>

          <!-- 关注按钮子组件 -->
          <follow-user
            :is-followed="artDetails.is_followed"
            :user-id="artDetails.aut_id"
            @update-is-followed="artDetails.is_followed=$event"
          ></follow-user>

        </van-cell>

        <!-- 文章内容区域 -->
        <div
          class="article-content markdown-body"
          v-html="artDetails.content"
          ref="contentRef"
        ></div>
        <!-- 分割线 -->

        <van-divider>正文结束</van-divider>

        <!-- 评论模块 -->
        <article-comment
          :article-id="artDetails.aut_id"
          @total-count="totalCommentCount=$event.total_count"
        />

        <!-- 底部区域 -->
        <div class="article-bottom">

          <van-button
            @click="ChangeCommentShow"
            text="写评论"
            round
            size="small"
          />

          <!-- <van-button
            @click="$router.push('/test')"
            text="写评论"
            round
            size="small"
          /> -->

          <van-popup
            class="popup-box"
            v-model="isCommentShow"
            position="bottom"
          >
            <comment-post :art-data="artDetails" />
          </van-popup>

          <van-icon
            name="comment-o"
            :badge="commentsTotal"
            color="#777"
          />
          <!-- 收藏按钮 -->
          <collect-article
            :is-collected="artDetails.is_collected"
            :art-id="artDetails.art_id"
            @updata-is-collected="artDetails.is_collected=$event"
          ></collect-article>

          <!-- 点赞按钮 -->
          <good-job
            :art-id="artDetails.art_id"
            :attitude-val="artDetails.attitude===null ? -1 : artDetails.attitude"
            @update-attitude="artDetails.attitude=$event"
          ></good-job>

          <!-- 分享按钮 -->
          <van-icon
            name="share"
            color="#777777"
            @click="showShare=true"
          ></van-icon>

          <!-- 分享面板 -->
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </div>

      </div>

      <!--404 加载失败  -->
      <div
        v-else-if="errStatus===404"
        class="load-failed"
      >
        <van-icon name="failure"></van-icon>
        <span class="text">该资源不存在或已删除</span>
      </div>

      <!--其它错误 加载失败  -->
      <div
        v-else
        class="load-failed"
      >
        <van-icon name="failure"></van-icon>
        <span class="text">内容加载失败</span>
        <van-button
          class="retry-btn"
          @click="loadArtdetail"
        >点击重试</van-button>
      </div>

    </div>

    <!-- 评论回复 -->
    <van-popup
      class="reply-details"
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply v-if="isReplyShow" />
    </van-popup>

  </div>
</template>

<script>
// 导入获取文章详情调用接口、关注用户的调用接口
import { getArtdetail } from '@/api/user'
// 导入图片预览方法
import { ImagePreview } from 'vant'
// 导入关注用户组件
import FollowUser from '@/components/follow-user/index'
// 导入收藏组件
import CollectArticle from '@/components/collect-article/index'
// 导入点赞组件
import GoodJob from '@/components/good-job/index'
// 导入文章评论组件
import ArticleComment from '@/views/article/components/article-comment'
// 导入评论弹窗组件
import CommentPost from '@/views/article/components/comment-post'
import CommentReply from '@/views/article/components/comment-reply'

import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'ArticleIndex',
  props: ['articleId'],
  components: {
    FollowUser,
    CollectArticle,
    GoodJob,
    ArticleComment,
    CommentPost,
    CommentReply
  },
  data () {
    return {
      isReplyShow: false,
      isLoadingFlage: false,
      // followUserStatus: false,
      goodJobFlag: false,
      likeFlag: false,
      loadFlag: true,
      isCommentShow: false,
      artDetails: {},
      errStatus: 0,
      commentChangeFlag: true,
      commentVal: '',
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' }
        ]
      ]
    }
  },
  created () {
    this.loadArtdetail()
    // this.isCommentShow = this.CommentShowFlag
  },
  mounted () {
    this.followUserStatus = this.artDetails.is_followed
  },
  computed: {
    ...mapGetters(['commentsTotal', 'CommentShowFlag']),
    ...mapState(['loadCommentTotal', 'commentShow', 'replyShow'])
  },
  watch: {
    commentVal (val) {
      this.commentChangeFlag = !val
    },
    commentShow (val) {
      console.log('commentShow -> val', val)
      this.isCommentShow = !this.isCommentShow
    },
    replyShow (val) {
      this.isReplyShow = !this.isReplyShow
    }
  },
  methods: {
    beforeRouteUpdate (to, from, next) {
      console.log(to.name)
      console.log(from)
    },

    ...mapMutations(['ChangeCommentShow', 'closeArticle', 'setArtData']),
    onClickLeft () {
      this.$router.back()
      this.closeArticle()
    },
    async loadArtdetail () {
      this.loadFlag = true
      try {
        const { data: res } = await getArtdetail(this.articleId)
        // console.log(res)

        // 手动设置错误测试
        // if (Math.random() > 0.5) JSON.parse('eqesadqdwqf')

        // 将文章数据上传到stroe中
        this.setArtData(res)

        this.artDetails = res.data
        this.followUserStatus = res.data.is_followed

        // 图片预览初始化
        setTimeout(() => {
          this.imgPre()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取文章详情失败，请重试！')
        console.log(err)
      }
      this.loadFlag = false
    },
    imgPre () {
      const images = []
      // console.log(images)
      this.$refs.contentRef.querySelectorAll('img').forEach((v, i) => {
        images.push(v.src)
        v.addEventListener('click', () => ImagePreview({
          images,
          startPosition: i
        }))
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import "./github-markdown.css";
.article-container {
  .page-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #3296fa;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-detail {
      padding: 0 29px;
      .art-title {
        color: #3a3a3a;
        font-size: 40px;
        padding: 48px 0 0;
        margin: 0 0 57px;
      }
      .user-info {
        display: flex;
        height: 70px;
        // background-color: #f5f7f9;
        justify-content: space-between;
        padding: unset;
        margin-bottom: 50px;
        border-bottom: unset;
        &::after {
          border-bottom: unset;
        }
        .user-left {
          display: flex;
          .user-avatar {
            // float: left;
            width: 70px;
            height: 70px;
          }
          .user-info-text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 18px;
            .user-name {
              color: #333333;
              font-size: 23px;
              line-height: 23px;
            }
            .pub-date {
              color: #b4b4b4;
              font-size: 23px;
              line-height: 23px;
            }
          }
        }

        .van-cell__value {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .follow-btn {
          width: 170px;
          height: 58px;
          font-size: 28px;
        }
      }
    }
    .loading-wrap {
      margin-top: 100px;
      // .van-loading__spinner {
      //   width: 120px;
      //   height: 120px;
      // }
    }
    .load-failed {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 280px;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .van-button {
      width: 160px;
      height: 50px;
    }
    .popup-box {
      // display: flex;
      // align-items: center;
      // padding: 30px 0 30px 30px;
      ::v-deep .van-field {
        // margin-top: 80px;
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
  }
}
</style>
