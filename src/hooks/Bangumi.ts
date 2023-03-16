import { getSubjectInfoApi } from './../api/bangumi'
import { getCalendarApi } from '@/api/bangumi'
import { getBroswerDataApi } from '@/api/bangumiMy'
import { getFormatTime } from '@/utils/dayjs'
import { ElMessage } from 'element-plus'
import { Ref } from 'vue'
export const useAnimeCalendar = async () => {
  let weekDayList = Array<Bangumi.CalendarItem>()
  const { data } = await getCalendarApi()
  weekDayList = data.data
  return weekDayList
}
export const useAnimeData = () => {
  const weekdayMap = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDayList = shallowRef<Array<Bangumi.CalendarItem>>()
  // 获取今天星期几
  const day = ref('')
  const getWeekData = async () => {
    try {
      const { data } = await getCalendarApi()
      weekDayList.value = data.data
      weekDayList.value?.forEach(item => {
        item.items.sort((a, b) => {
          // 排序 首先是根据collection 的doing数据来排序 没有这个数据根据评分总数据 没有的话根据评分排序 最后根据bgm排名排序
          if (a.collection && b.collection) {
            if (a.collection.doing && b.collection.doing) {
              return b.collection.doing - a.collection.doing
            }
          } else if (a.rating && b.rating) {
            if (a.rating.total && b.rating.total) {
              const res = b.rating.total - a.rating.total
              return res ? res : 0
            } else if (a.rating.score && b.rating.score) {
              const res = b.rating.score - a.rating.score
              return res ? res : 0
            }
          } else {
            if (a.rank && b.rank) {
              return a.rank - b.rank
            }
          }
          return 0
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  const getToday = () => {
    const day = new Date().getDay()
    if (day === 0) return '6'
    else return (day - 1).toString()
  }
  // 执行一下获取data
  getWeekData()
  day.value = getToday()
  let today = getFormatTime(new Date().toString(), 'YYYY年MM月DD日')
  today += ' ' + weekdayMap[new Date().getDay()]
  return { today, weekDayList, day }
}
export const useBroswer = (
  Loading: Ref<boolean>,
  animeInfoList: Ref<Array<Bangumi.BroswerResult>>,
  page: Ref<number>
) => {
  const getBroswer = async (broswerParams: Bangumi.BroswerParams) => {
    if (broswerParams.page == 1) {
      Loading.value = true
    }
    const { data } = await getBroswerDataApi(broswerParams)
    if (data.code === 200) {
      if (broswerParams.page == 1) {
        animeInfoList.value = data.data.results
        page.value = data.data.pages
      } else {
        animeInfoList.value = animeInfoList.value.concat([...data.data.results])
      }
      Loading.value = false
    } else {
      ElMessage.error('请求排行榜失败')
      Loading.value = false
    }
  }
  return { getBroswer }
}
/**
 * 根据id集合  获取每个subject的消息 通过v0接口来进行获取
 * @param ids subject ids
 * @returns Promise<PromiseSettledResult<AnimeItemInfo>[]> 一个promise.Seetled的结果集
 */
export const useSubjectInfo = (
  ids: number[]
): Promise<PromiseSettledResult<Bangumi.SubjectInfoSmall>[]> => {
  const promises: Promise<Bangumi.SubjectInfoSmall>[] = []
  const getPromise = (id: number): Promise<Bangumi.SubjectInfoSmall> => {
    return new Promise((resolve, reject) => {
      getSubjectInfoApi(id)
        .then(({ data }) => {
          resolve(data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  for (const id of ids) {
    promises.push(getPromise(id))
  }

  return Promise.allSettled(promises)
}
/**
 * 根据分数获取评价
 * @param val 分数
 * @return 一个computed类型的数据
 */
export const useRatingTag = (val: number) => {
  const ratingTag = computed<string>(() => {
    let tag = ''
    if (val >= 8.5) {
      tag = '神作'
    } else if (val < 8.5 && val >= 7.5) {
      tag = '不可多得'
    } else if (val < 7.5 && val >= 6.5) {
      tag = '佳作'
    } else if (val < 6.5 && val >= 5.5) {
      tag = '还算可以'
    } else if (val < 5.5 && val >= 4.5) {
      tag = '勉强能看'
    } else if (val < 4.5 && val >= 3.5) {
      tag = '厕所消遣'
    } else if (val < 3.5) {
      tag = '图一乐'
    } else {
      tag = '暂无数据'
    }
    return tag
  })
  return { ratingTag }
}
