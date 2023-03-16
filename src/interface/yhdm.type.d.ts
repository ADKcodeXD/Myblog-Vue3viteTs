declare interface Epinfo {
  epTitle: string
  epUrl: string
}

declare interface YhdmSearchInfo {
  title: string
  epInfo: Epinfo[]
}

declare interface YhdmVideoInfo {
  title: string
  epInfo: Epinfo[]
  videoUrl: string
}
