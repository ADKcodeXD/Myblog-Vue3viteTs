import { changeStatus, changeProgress } from './../api/followBangumi'
import { deleteFollow, followNewAnime, getMyFollowDetail, getMyFollow } from '@/api/followBangumi'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'

export const useFollowNewBnagumi = async (params: FollowBangumiParams) => {
  const userinfo = useUserStore()
  if (!userinfo.userinfo.id) {
    ElMessage.error('请登录后进行追番')
    return
  }
  const followAnimeParams: FollowBangumiParams = reactive<FollowBangumiParams>({
    userId: userinfo.userinfo.id,
    animeId: params.animeId,
    totalEps: params.totalEps,
    lastViewEpUrl: params.lastViewEpUrl,
    lastViewEpTime: params.lastViewEpTime,
    animeName: params.animeName,
    animeNameCn: params.animeNameCn,
    animeDesc: params.animeDesc,
    animeRating: params.animeRating,
    animeRank: params.animeRank,
    animePic: params.animePic,
    airDay: params.airDay
  })
  const { data } = await followNewAnime(followAnimeParams)
  const followNewAnimeInfo = data.data
  ElMessage.success('追番成功')
  return { followAnimeParams, followNewAnimeInfo }
}

export const useUnFollowBangumi = async (id: string) => {
  const userinfo = useUserStore()
  if (!userinfo.userinfo.id) {
    ElMessage.error('请登录后进行追番')
    return
  }
  await deleteFollow(id)
  ElMessage.success('取消追番成功')
  return {}
}
/**
 * 传入动漫id 获取该动漫的追番信息
 * @param animeId 动漫id
 * @returns 如果有追番则返回一个followInfo 否则返回undefined
 */
export const useGetFollowInfoByAnimeId = async (animeId: number) => {
  const userinfo = useUserStore()
  if (!userinfo.userinfo.id) return null
  const { data } = await getMyFollowDetail(animeId)
  const followInfo: FollowBangumiVo = data.data
  return { followInfo }
}

export const useChangeFollowStatus = (id: string, oldData: FollowBangumiVo) => {
  const changeFollowStatus = async (status: number) => {
    const userinfo = useUserStore()
    if (!userinfo.userinfo.id) {
      ElMessage.error('请登录后操作')
      return null
    }
    const { data } = await changeStatus(id, status)
    if (data.code === 200) {
      ElMessage.success('操作成功')
      oldData.status = data.data.status
    } else {
      ElMessage.error(data.msg)
    }
  }

  return { changeFollowStatus }
}

export const useChangeProcess = async (processParams: FollowProgressParams, needShow: boolean) => {
  let followInfo: FollowBangumiVo = null
  const userinfo = useUserStore()
  if (!userinfo.userinfo.id) {
    return null
  }
  const { data } = await changeProgress(processParams)
  if (data.code === 200) {
    if (needShow) {
      ElMessage.success('操作成功')
    }
    followInfo = data.data
  } else {
    followInfo = null
  }
  return { followInfo }
}

export const useGetMyFollow = async (status: number, pageparams: PageParams) => {
  const { data } = await getMyFollow(status, pageparams)
  return data.data
}
