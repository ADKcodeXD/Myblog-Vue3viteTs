
import { BangumiType, BroswerType, ResponseGroup, SortRole } from "./BangumiEnum"
export interface WeekDay {
    en: string,
    cn: string,
    ja: string,
    id: string | number
}
export interface Collection {
    doing: number,
    on_hold?: number,
    dropped?: number,
    collect?: number,
    wish?: number
}
export interface Images {
    large?: string,
    common?: string,
    medium?: string,
    small?: string,
    grid?: string,
}
export interface Rating {
    total: number,
    count: object,
    score: number,
}
export interface AnimeTag {
    name: string,
    count: number
}
interface V {
    v: string
}
export interface InfoBoxItem {
    key: string,
    value: string | Array<V>
}
export interface AnimeInfoBase {
    id: number,
    type: number,
    name: string,
    name_cn: string,
    images: Images,
    collection: Collection,
    summary?: string | undefined | void,
    rating: Rating,
}

export interface AnimeItemInfo extends AnimeInfoBase {
    url: string,
    rank: number,
    air_date: string,
    air_weekday: number,
}
export interface AnimeItemInfoCollection extends AnimeItemInfo {
    CollectionInfo: CollectionStatus
}
export interface CalendarItem {
    weekday: WeekDay,
    items: Array<AnimeItemInfo>
}
/**
 * 使用v0接口获取到的信息
 * */ 
export interface SubjectInfoSmall extends AnimeInfoBase {
    date: string,
    platform: string,
    tags: Array<AnimeTag>,
    infobox: Array<InfoBoxItem>,
    eps: number,
    volumes: number,
    locked: Boolean,
    nsfw: Boolean,
    total_episodes: number
}

/**
 * 用于获取排行榜和分页的参数
 */
export interface BroswerParams {
    sort?: SortRole,
    order?: string,
    type?: BroswerType,
    page?: number,
    airtime?: string,
    bigType?: string,
    tag?: string
}
/**
 * 接受到的排行榜的参数类型
 */
export interface BroswerResult {
    id: number,
    name: string,
    nameCn?: string,
    rank?: number,
    infoTip: string,
    score?: number,
    count?: number,
    imageUrl: string
}

// 动漫详情页
/**
 * 章节详情类型
 */
export interface EpDeatil {
    id: number,
    url: string,
    type: number,
    sort: number,
    name: string,
    name_cn: string,
    duration: string,
    airdate: string,
    comment: number,
    desc: string,
    status: string
    // 状态 开播和未开播 Air以及NA
}
/**
 * 声优类
 */
export interface Actor {
    id: number,
    url: string,
    name: string,
    images: Images | null
}
/**
 *  别名类
 */
export interface Alias {
    zn?: string,
    jp?: string,
    kana?: string,
    romaji?: string,
    "0"?: string,
    "1"?: string,
    "2"?: string,
    "3"?: string
}
/**
 * info类 一个是动漫人物的info 一个是staff的
 */
export interface AnimeHumanInfo {
    name_cn: string,
    height?: string,
    alias: Alias,
    gender: string,
    birth?: string,
    // 其实还有什么source 数据比较复杂 这里就不显示了
}
/**
 * 动漫人物的info
 */
export interface StaffHumanInfo {
    alias: Alias,
    name_cn?: string,
    gender?: string,
    birth?: string,
    Twitter?: string,
    bloodtype?: string
}
/**
 * 人物 基类 Human
 */
export interface Human {
    id: string,
    url: string,
    name: string,
    name_cn: string,
    role_name: string,
    images: Images,
    comment: number,
    collects: number,
}

/**
 * staff 类
 */
export interface StaffHuman extends Human {
    jobs: Array<string>,
    info: StaffHumanInfo
}
/**
 * 动画人物类
 */
export interface AnimeHuman extends Human {
    actors: Array<Actor>,
    info: AnimeHumanInfo,
}

/**
 * 详细信息 类
 */
export interface AnimeDeatilItem extends AnimeInfoBase {
    url: number,
    air_date: string
    air_weekday: number,
    rank: number,
    crt: Array<AnimeHuman>,
    staff: Array<StaffHuman>,
    eps: Array<EpDeatil>,
    eps_count: number
}

/**
 * 搜索详情params
 */
export interface SearchParamsBgm {
    keywords: string,
    type?: BangumiType,
    responseGroup?: ResponseGroup,
    start?: number,
    max_results?: number
}

/**
 * 个人信息
 * avatar只有Large Medium Small
 */
export interface BangumiMyInfo {
    id: string,
    url: string,
    username: string,
    nickname: string,
    user_group: number,
    avatar: Images,
    sign: string
}
/**
 * 用于正在追番的接口
 */
export interface SubjectSeeing extends AnimeInfoBase {
    eps: number,
    eps_count: number,
    air_date: string,
    air_weekday: number
}
/**
 * 正在追番信息的类
 */
export interface MySeeing {
    name: string,
    subject_id: number,
    /**
     * 看番到第几集的状态
     * */
    ep_status: number,
    /**
     * 未知
     */
    vol_status: number,
    /**
     * 时间戳 最后操作时间
     */
    lasttouch: number,
    subject: SubjectSeeing,
}

/**
 * CollectionStatus 收藏的详细消息
 */
export interface CollectionStatus {
    comment: string,
    ep_status: number,
    lasttouch: number,
    private: number,
    /**
     * 我的评分
     */
    rating: number,
    status:{
        id:number,
        type:"wish" | "collect" | "do" | "on_hold" | "dropped",
        name:string
    },
    tag:string[],
    user:Object,
    vol_status:number
}