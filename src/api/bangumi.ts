import { SearchParamsBgm } from '@/interface/bangumiApi.type';
import bangumiRequest from '@/utils/bangumiApi';


// 获取每日更新 这个不需要登录 /calendar
export const getCalendarApi = () => {
    return bangumiRequest({
        method: 'get',
        url: '/calendar'
    })
}

// 获取subject small 
export const getSubjectInfoApi = (subjectId: number) => {
    return bangumiRequest({
        method: 'get',
        url: `/v0/subjects/${subjectId}`
    })
}

// 获取subject 所有详细消息
export const getSubjectInfoAllApi = (subjectId: number) => {
    return bangumiRequest({
        method: 'get',
        url: `/subject/${subjectId}`,
        params: { responseGroup: "large" }
    })
}

// 获取搜索结果
export const getSubjectSeachApi = (searchParams: SearchParamsBgm,) => {
    return bangumiRequest({
        method: 'get',
        url: `/search/subject/${searchParams.keywords}`,
        params: {
            responseGroup: searchParams.responseGroup,
            start: searchParams.start,
            max_results: searchParams.max_results,
            type: searchParams.type
        }
    })
}