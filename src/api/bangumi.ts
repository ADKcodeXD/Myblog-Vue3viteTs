import bangumiRequest from '@/utils/bangumiApi';
import axios from 'axios';
import qs from 'qs';

const PROXY = process.env.NODE_ENV == 'development' ? '/bgm' : '';
const PROXY_TV = process.env.NODE_ENV == 'development' ? '/bgmtv' : 'https://bgm.tv';
// 获取每日更新 这个不需要登录 /calendar
export const getCalendarApi = () => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + '/calendar'
    })
}
/**
 * 可以通过这个api 来获取infobox 以及tags
 * @param subjectId 需要条目的id
 * @returns 
 */
export const getSubjectInfoApi = (subjectId: number) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/v0/subjects/${subjectId}`
    })
}

/**
 * 获取条目信息 返回一个SubjectInfoSmall
 * @param subjectId 条目id
 * @param responseGroup 返回数据大小 默认为large 传入small返回small 可选属性
 * @param timestamp 防止走304 强制缓存 可选 传入一个date.getTime()
 * @returns 返回一个
 */
export const getSubjectInfoAllApi = (subjectId: number, responseGroup?: string,timestamp?:number) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/subject/${subjectId}`,
        params: { responseGroup: responseGroup ? responseGroup : 'large',timestamp:timestamp }
    })
}

// 获取搜索结果
export const getSubjectSeachApi = (searchParams: Bangumi.SearchParamsBgm) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/search/subject/${searchParams.keywords}`,
        params: {
            responseGroup: searchParams.responseGroup,
            start: searchParams.start,
            max_results: searchParams.max_results,
            type: searchParams.type
        }
    })
}
/**
 * 回调页面自动携带query code 参数
 * @param code 
 * @returns 
 */
export const getBangumiToken = (code: string) => {
    return axios({
        method: 'post',
        url: PROXY_TV + '/oauth/access_token',
        data: {
            grant_type: 'authorization_code',
            client_id: 'bgm21996223860e72a53',
            client_secret: 'cd93d0b9e59c8e66beb59325c5c1b875',
            code: code,
            redirect_uri: 'http://localhost:5000/index/animebgminfo'
        }
    })
}

/**
 * 无需参数 使用authorization头获取信息
 * @returns 
 */
export const getMyBangumiInfo = () => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + '/v0/me'
    })
}

/**
 * @param responseGroup 默认medium 获取条目详细信息
 * @param cat watching 只有动画 all_watching 包含书籍
 * @param uid 用户的id
 * @returns 
 */
export const getMySeeingCollection = (uid: number, cat?: ['watching', 'all_watching'], responseGroup?: ['medium', 'small']) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/user/${uid}/collection`,
        params: {
            cat: cat ? cat : 'watching',
            responseGroup: responseGroup ? responseGroup : 'medium'
        }
    })
}

/**
 * 获取收藏信息 比如 comment
 * 注意：没有相关的条目信息
 * @param timestamp 时间戳 用于防止强制缓存
 * @param uid 用户名的uid 
 */
export const getCollectionStatus = (uid: number,timestamp?:number) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/user/${uid}/collections/status`,
        params: {
            app_id: 'bgm21996223860e72a53',
            timestamp:timestamp
        }
    })
}


/**
 * 用于查询用户收藏的某条条目的相关信息
 * @param subjectId 条目id
 * @param timestamp 防止浏览器使用本地缓存 传入一个date的geitTime时间戳即可  可选 建议在更改表单才使用
 * @returns 
 */
export const getSubjectCollection = (subjectId: number,timestamp?:number) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/collection/${subjectId}`,
        params: {
            app_id: 'bgm21996223860e72a53',
            timestamp:timestamp
        }
    })
}
/**
 * 根据id和type 获取在看 想看等不同分类的收藏  可以分页
 * @param uid 用户id 必须
 * @param type 在看 想看之类的类型 默认全部
 * @param limit 一次最多获取条目数量 最大30 默认30
 * @param offset 分页标记 开始0
 * @param subject_type 条目类型 如音乐 游戏 三次元等 默认全部
 * @returns 
 */
export const getUserCollectionByType = (uid: number, type?: number, limit?: number, offset?: number, subject_type?: number) => {
    return bangumiRequest({
        method: 'get',
        url: PROXY + `/v0/users/${uid}/collections`,
        params: {
            subject_type: subject_type,
            type: type,
            limit: limit,
            offset: offset
        }
    })
}

/**
 * 更改用户的收藏信息
 * @param subjectId 必须 条目id
 * @param action 必须 两个可选的值 一个是更新 一个是创建收藏
 * @param status 必须 状态 可选五个值 
 * @param comment 短评 非必须
 * @param rating 评分 需要在0-10内
 * @param privacy 是否私有收藏 0否 1 是
 * @param tags 标签 可以添加单个 也可以添加多个标签 传入数组即可 非必须
 * @returns 
 */
export const changeCollectionStatus = (subjectId: number, action: 'create' | 'update' = 'update', 
status: 'wish' | 'collect' | 'do' | 'on_hold' | 'dropped',
tags?:string[]|string,
comment?: string, rating?: number,privacy?:number) => {
    return bangumiRequest({
        method: 'post',
        url: PROXY + `/collection/${subjectId}/${action}`,
        data:qs.stringify({
            status:status,
            comment:comment,
            rating:rating,
            privacy:privacy,
            tags:Array.isArray(tags)?tags.join(" "):tags
        }),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
    })
}