// 这是用于 首页的 我自己的接口
export enum SortRole {
    rank = "rank",
    date = "date",
    title = "title"
}
export enum Type {
    Book = 1,
    Anime = 2,
    Music = 3,
    Game = 4,
    Real = 5
}

export enum BroswerType {
    TV = "tv",
    WEB = "web",
    OVA = "ova",
    MOVIE = "movie",
    MISC = "misc"
}

export enum Status {
    Ok = "Air",
    No = "NA"
}

export enum CollectionType {
    doing = "在看",
    on_hold = "搁置",
    wish = "想看",
    collect = "看过",
    dropped = "抛弃"
}


export enum BangumiType {
小说Book = 1,
动漫Anime = 2,
音乐Musci = 3,
游戏Game = 4,
三次元Real = 6,
key
}
export enum WeekDayType {
    星期天 = 7,
    星期一 = 1,
    星期二 = 2,
    星期三 = 3,
    星期四 = 4,
    星期五 = 5,
    星期六 = 6
}

export enum ResponseGroup {
    Large = "large",
    Medium="medium",
    Small="small"
}
