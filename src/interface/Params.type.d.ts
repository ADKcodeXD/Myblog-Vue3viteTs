declare global{
    interface PageParams {
        page: number,
        pagesize: number,
        authorId?: string,
        tagIds?: Array<number>,
        year?: string,
        month?: string,
        orderRole?: string,
        keyword?:string
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
        url:string
    }
}
export{}