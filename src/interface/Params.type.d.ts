declare global{
    interface PageParams {
        page: number,
        pagesize: number,
        authorId?: string,
        tagIds?: Array<number>,
        year?: string,
        month?: string,
        orderRole?: string,
        keyword?:string,
        //该选项是用于筛选文章板块的 可选1是 水文日常 2是 技术文章 3是 个人 笔记 4是 素材或者分享 5是 其他  6是 设计排版 参考 7是 素材资源 文章分享
        pannel?:number,
        //pic画廊的筛选项
        tag?:number,
        isOrigin?:number,

    }
    interface CommentParams {
        articleId: string,
        toUid?: string,
        parentId?: string,
        content: string,
        authorId:string,
    }
    interface MessageParamsForADK {
        authorName: string,
        contact: string,
        content: string,
        avatar: string
    }
    interface RegisterParams {
        username: string,
        nickname: string,
        password: string
    }
    interface UpdateUserInfoParams {
        avatar: string,
        nickname: string,
        introduce: string,
        banner: string,
        gender: string,
        email: string
    }
    interface LikeOrCollectParams {
        articleId:string,
        flag:Boolean
    }
    interface PicParams {
        title:string,
        summary:string,
        url:string,
        isOrigin:number
    }
}
export{}