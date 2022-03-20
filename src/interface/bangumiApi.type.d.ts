import { BroswerType, SortRole } from "./BangumiEnum"


export interface WeekDay {
    en: string,
    cn: string,
    ja: string,
    id: string | number
}
export interface Collection {
    doing: number,
    on_hold?:number,
    dropped?:number,
    collect?:number,
    wish?:number
}
export interface Images {
    large: string,
    common: string,
    medium: string,
    small: string,
    grid: string,
}
export interface Rating {
    total: number,
    count: object,
    score: number,
}
export interface AnimeTag{
    name:string,
    count:number
}
export interface InfoBoxItem{
    key:string,
    value:string
}
export interface AnimeInfoBase{
    id: number,
    type: number,
    name: string,
    name_cn: string,
    images: Images,
    collection: Collection,
    summary: string | undefined | void,
    rating: Rating,
}

export interface AnimeItemInfo extends AnimeInfoBase {
    url: string,
    rank: number,
    air_date: string,
    air_weekday: number,
}
export interface CalendarItem {
    weekday: WeekDay,
    items: Array<AnimeItemInfo>
}
// 使用v0接口获取到的信息
export interface SubjectInfoSmall extends AnimeInfoBase{
    date:string,
    platform:string,
    tags:Array<AnimeTag>,
    infobox:Array<InfoBoxItem>,
    eps:number,
    volumes:number,
    locked:Boolean,
    nsfw:Boolean,
    total_episodes:number
}


export interface BroswerParams{
    sort?:SortRole,
    order?:string,
    type?:BroswerType,
    page?:number,
    airtime?:string,
}
export interface BroswerResult{
    id:number,
    name:string,
    nameCn?:string,
    rank?:number,
    infoTip:string,
    score?:number,
    count?:number,
    imageUrl:string
}
