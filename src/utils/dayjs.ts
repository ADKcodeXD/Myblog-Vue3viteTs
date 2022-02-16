import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 使用中文语言包
dayjs.locale('zh-cn')

export const getRealativeTime = (value: string) => {
    return dayjs(value).from(dayjs())
}