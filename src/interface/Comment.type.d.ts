declare interface CommentItemInfo{
    childrens?:Array<CommentItemInfo>,
    content:string,
    createDate:string,
    id?:string,
    toUser?:UserEasy,
    user?:UserEasy,
    // 这几个都是为了适配 留言区的评论
    contact?:string,
    nickname?:string,
    avatar?:string,
    level?:number
}