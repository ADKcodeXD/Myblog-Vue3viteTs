declare interface FollowBangumiParams {
  userId?: string
  animeId: number
  totalEps?: number
  lastViewEpUrl?: string
  lastViewEpTime?: string
  animeName: string
  animeNameCn?: string
  animeDesc?: string
  animeRating?: string
  animeRank?: number
  animePic: string
  airDay: number
}
declare interface FollowProgressParams {
  id: string
  progress: number
  lastViewEpUrl?: string
  lastViewEpTime?: string
}

declare interface FollowBangumiVo {
  id: string
  userId: string
  animeId: string
  status: number
  progress: number
  totalEps: number
  lastOperate: string
  createDate: string
  lastViewEpUrl: string
  lastViewEpTime: string
  animeName: string
  animeNameCn: string
  animeDesc: string
  animeRating: string
  animeRank: string
  airDay: number
  animePic: string
}
