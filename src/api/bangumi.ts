import bangumiRequest from '@/utils/bangumiApi';


// 获取每日更新 这个不需要登录 /calendar
export const getCalendarApi = () => {
    return bangumiRequest({
        method: 'get',
        url: '/calendar'
    })
}

// 获取subject small 
export const getSubjectInfoApi = (subjectId:number) => {
    return bangumiRequest({
        method: 'get',
        url: `/v0/subjects/${subjectId}`
    })
}