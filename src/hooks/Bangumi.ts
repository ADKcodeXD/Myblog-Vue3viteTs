import { getCalendarApi } from "@/api/bangumi";
import { CalendarItem } from "@/interface/bangumiApi.type";
import { getFormatTime } from "@/utils/dayjs";
export const useAnimeCalendar=async ()=>{
  let weekDayList = Array<CalendarItem>();
  const { data } = await getCalendarApi();
  weekDayList = data;
  return weekDayList;
}
export const useAnimeData = () => {
  let weekdayMap = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  let weekDayList = ref<Array<CalendarItem>>();
  const getWeekData = async () => {
    const { data } = await getCalendarApi();
    weekDayList.value = data;
    weekDayList.value?.forEach(item => {
      item.items.sort((a, b) => {
        // 排序 首先是根据collection 的doing数据来排序 没有这个数据根据评分总数据 没有的话根据评分排序 最后根据bgm排名排序
        if (a.collection && b.collection) {
          if (a.collection.doing && b.collection.doing) {
            return b.collection.doing - a.collection.doing
          }
        } else if (a.rating && b.rating) {
          if (a.rating.total && b.rating.total) {
            let res=b.rating.total - a.rating.total;
            return res?res:0;
          } else if (a.rating.score && b.rating.score) {
            let res=b.rating.score - a.rating.score;
            return res?res:0;
          }
        }
        else {
          if (a.rank && b.rank) {
            return a.rank - b.rank
          }
        }
        return 0;
      })
    });
  };
  getWeekData();
  // 获取今天星期几
  let day = ref('');
  let getToday = () => {
    let day = new Date().getDay();
    if (day === 0) return '6';
    else return (day + 1).toString();
  }

  day.value = getToday();


  let today = getFormatTime(new Date().toString(), "YYYY年MM月DD日")
  today += " " + weekdayMap[new Date().getDay()];
  return {
    today, weekDayList, day
  }
} 
