<template>
  <div class="channel-edit">
    <div class="i-channel">
      <!-- 我的频道标题栏 -->
      <div class="i-channel-title">
        <span>我的频道</span>
        <van-button
          class="i-channel-titleBtn"
          plain
          type="danger"
          round
          size="mini"
          :text=" isEditFlag ? '完成':'编辑' "
          @click="iChannelBtn"
        ></van-button>
      </div>
      <!-- 我的频道列表栏 -->
      <div class="i-channel-list">
        <van-grid :gutter="10">
          <van-grid-item
            name="chat-o"
            v-for="(value,index) in channel"
            :key="value.id"
            @click="iChannelTab(value,index)"
          >
            <div class="text-wrap">
              <span :class="{active:index===activeIndex}">{{value.name}}</span>
            </div>
            <van-icon
              v-show=" value.name==='推荐'? false : isEditFlag"
              class="clear-icon"
              name="clear"
            />
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="channel-recom">
      <div class="channel-recom-title">
        <span>频道推荐</span>
      </div>
      <div class="channel-recom-list">
        <van-grid :gutter="10">
          <van-grid-item
            name="chat-o"
            v-for="value in channelRecomList"
            :key="value.id"
            :text="value.name"
            @click="onRecomChannelBtn(value)"
          >
            <div
              slot="text"
              class="text-wrap"
            >
              <van-icon name="plus"></van-icon>
              <span>{{value.name}}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllChannelList, addUserChannel, delUserChannel } from '@/api/user'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'channelEdit',
  props: {
    channel: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEditFlag: false,
      allChannelList: []
      // textWrapActiveId: 0
    }
  },
  created () {
    this.getRecomlList()
  },
  methods: {
    async getRecomlList () {
      try {
        const { data: res } = await getAllChannelList()
        this.allChannelList = res.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取所有频道列表数据失败')
      }
    },
    async onRecomChannelBtn (channelItem) {
      this.channel.push(channelItem)

      // console.log(channelItem.id, this.channel.length)
      if (this.user) {
        try {
          const { data: res } = await addUserChannel({
            id: channelItem.id,
            seq: this.channel.length
          })
          console.log(res)
        } catch (err) {
          this.$toast('新增频道保存失败，请稍后重试')
          console.log('新增频道保存失败', err)
        }
      } else {
        setItem('TNEWS_CHANNELS', this.channel)
      }
    },
    iChannelBtn () {
      this.isEditFlag = !this.isEditFlag
    },
    iChannelTab (channel, index) {
      if (this.isEditFlag) {
        if (channel.name === '推荐') { return this.$toast('推荐频道无法删除！') }
        if (index <= this.activeIndex) {
          this.$emit('update:active-index', this.activeIndex - 1, true)
        }
        // this.channel.splice(this.channel.findIndex(v => v.id === channel.id), 1)
        this.channel.splice(index, 1)

        // 线上删除频道
        this.delChannel(channel.id)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    async delChannel (channelId) {
      if (this.user) {
        try {
          await delUserChannel(channelId)
        } catch (err) {
          this.$toast('删除频道失败，请稍后重试')
          console.log('删除频道失败', err)
        }
      } else {
        setItem('TNEWS_CHANNELS', this.channel)
      }
    }

  },
  computed: {
    ...mapState(['user']),
    // channelRecomList () {
    //   return this.allChannelList.filter(item => {
    //     return this.channel.findIndex(v => {
    //       return v.id === item.id
    //     }) === -1
    //   })
    // }

    channelRecomList: (onThis) => onThis.allChannelList.filter(item => onThis.channel.findIndex(v => v.id === item.id) === -1)

  }

}
</script>

<style lang="scss" scoped>
.channel-edit {
  margin-top: 100px;
  .i-channel-title,
  .channel-recom-title {
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    margin-bottom: 48px;
    span {
      color: #333333;
      font-size: 32px;
    }
    .i-channel-titleBtn {
      width: 104px;
      height: 48px;
      line-height: 0;
      .van-button__text {
        color: #f96969;
        font-size: 26px;
      }
    }
  }
  .i-channel-list,
  .channel-recom-list {
    .van-grid-item {
      width: 16px;
      height: 86px;
      ::v-deep .van-grid-item__content {
        background-color: #f4f5f6;
      }
      .clear-icon {
        position: absolute;
        top: -10px;
        right: -10px;
        color: gray;
        font-size: 35px;
        z-index: 3;
      }
      .text-wrap {
        color: #222;
        font-size: 28px;
        text-align: center;
        white-space: nowrap;
        .active {
          color: orangered;
        }
      }
    }
  }

  .channel-recom {
    margin-top: 75px;
  }
}
</style>
