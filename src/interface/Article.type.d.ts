declare global {
    interface ArticleBody{
        contentHtml?: string |void,
        html?:string,
        content: string |void,
    }
    interface ArticleReqParams {
        body: ArticleBody,
        summary: string,
        articleName: string,
        tags: Array<Tag>,
        banner: string
    }
    interface Content{
        html:string|undefined,
        text:string|undefined
    }
    interface ArticleItemInfo{
        articleName:string,
        author:string,
        authorVo:UserEasy,
        banner:string,
        body?:ArticleBody,
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
    
    interface Banner{
        banner:string,
        id:string,
        articleName:string
    }
    interface ArticleListItem{
        articleVoList:Array<ArticleItemInfo>,
        length:number
    }
    interface ArticleTime{
        date:string,
        num:number
    }
    interface Tag {
        id: number,
        tagName: string
    }
    interface PicVo{
        title:string,
        summary:string,
        url:string,
        author:UserEasy,
        createTime:stirng,
        id:string,
        origin:number,
        likes:number,
        tag:number
    }
}

export {}
