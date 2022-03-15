import { Tag } from './tag';
import { UserEasy } from './user';
interface Body{
    contentHtml?: string |void,
    html?:string,
    content: string |void,
}


export interface ArticleReqParams {
    body: Body,
    summary: string,
    articleName: string,
    tags: Array<Tag>,
    banner: string
}

export interface Content{
    html:string|undefined,
    text:string|undefined
}
export interface ArticleItemInfo{
    articleName:string,
    author:string,
    authorVo:UserEasy,
    banner:string,
    body?:Body,
    commentCounts:number,
    createDate:string,
    id:string,
    summary:string,
    tags:Array<Tag>,
    viewCounts:number,
    isLiked:Boolean,
    isCollected:Boolean,
    likeCounts:Number,
    collectCounts:Number
}

export interface Banner{
    banner:string,
    id:string,
    articleName:string
}
export interface ArticleListItem{
    articleVoList:Array<ArticleItemInfo>,
    length:number
}
export interface ArticleTime{
    date:string,
    num:number
}