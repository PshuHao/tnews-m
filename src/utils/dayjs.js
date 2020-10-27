import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  return dayjs(value).fromNow()
})

// console.log(dayjs('2008').fromNow())
// console.log(dayjs().toNow('2008'))
