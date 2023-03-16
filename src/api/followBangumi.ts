import request from '@/utils/request'
import { AxiosPromise } from 'axios'
/// 该接口全部需要登录状态下使用

/**
 * 用于添加新增新番
 * @param followBnagumiParams 需要追番的动漫信息和一些值
 * @returns 返回追番成功的信息 一个追番信息vo实体
 */
export const followNewAnime = (followBnagumiParams: FollowBangumiParams) => {
  return request({
    method: 'post',
    url: `/api/follow/follownew`,
    data: followBnagumiParams
  })
}
/**
 * 用于修改追番的状态
 * @param id 追番id (注意是追番的详细id 不是动漫id)
 * @param status 更改状态 1是在看 2是看过 3是抛弃
 * @returns 不返回任何值
 */
export const changeStatus = (id: string, status: number) => {
  return request({
    method: 'put',
    url: `/api/follow/changestatus/${id}`,
    params: {
      status
    }
  })
}
/**
 * 可以是手动 也可以是自动 可以包含最后看番的时间(番剧播放到哪一分钟哪一秒) 包含url 可以直接跳转至该番剧链接进行观看
 * 手动的话那就是自己修改看到哪一集 不传其他两项
 * @param followProgressParams 追番的进度信息
 * @returns 不返回任何值
 */
export const changeProgress = (followProgressParams: FollowProgressParams) => {
  return request({
    method: 'put',
    url: `/api/follow/changeprogress`,
    data: followProgressParams
  })
}
/**
 * 删除该追番 取消追番
 * @param id 追番id (注意是追番的详细id 不是动漫id)
 * @returns 不返回任何值
 */
export const deleteFollow = (id: string) => {
  return request({
    method: 'delete',
    url: `/api/follow/delete/${id}`
  })
}
/**
 * 获取我的追番列表
 * @param status 追番的状态 1是在看 2是看过 3是抛弃
 * @param pageParams 分页参数
 * @returns 返回list
 */
export const getMyFollow = (status: number, pageParams: PageParams) => {
  return request({
    method: 'post',
    url: `/api/follow/myfollow`,
    data: pageParams,
    params: {
      status
    }
  }) as AxiosPromise<ApiResult<ListInfoResult<FollowBangumiVo>>>
}
/**
 * 获取某天的追番列表
 * @param status 追番的状态 1是在看 2是看过 3是抛弃
 * @param day 0为周一 6为周日
 * @returns 返回一个list
 */
export const getMyFollowByDay = (status: number, day: number) => {
  return request({
    method: 'get',
    url: `/api/follow/myfollowbyday`,
    params: {
      status,
      day
    }
  })
}
/**
 * 获取当前动漫id的追番详情信息
 * @param animeId 动漫id bangumi的id
 * @returns 一个详情
 */
export const getMyFollowDetail = (animeId: number) => {
  return request({
    method: 'get',
    url: `/api/follow/followdetail`,
    params: {
      animeId
    }
  })
}
