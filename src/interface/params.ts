export interface PageParams {
    page: number,
    pagesize: number,
    authorId?: string,
    tagIds?: Array<number>,
    year?: string,
    month?: string,
    orderRole?: string,
    keyword?:string
}


export interface CommentParams {
    articleId: string,
    toUid?: string,
    parentId?: string,
    content: string,
    authorId:string,
}

export interface MessageParamsForADK {
    authorName: string,
    contact: string,
    content: string,
    avatar: string
}

export interface RegisterParams {
    username: string,
    nickname: string,
    password: string
}

export interface UpdateUserInfoParams {
    avatar: string,
    nickname: string,
    introduce: string,
    banner: string,
    gender: string,
    email: string
}

export interface LikeOrCollectParams {
    articleId:string,
    flag:Boolean
}