export interface Epinfo{
    epTitle:string,
    epUrl:string
}

export interface YhdmSearchInfo {
    // private String title;
    // private List<String> epUrl;
    title:string,
    epInfo:Array<Epinfo>
}

export interface YhdmVideoInfo {
    // private String title;
    // private List<String> epUrl;
    title:string,
    epInfo:Array<Epinfo>,
    videoUrl:string,
}