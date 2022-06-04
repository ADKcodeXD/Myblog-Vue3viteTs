import request from '@/utils/request';


// 添加评论操作 
export const addComment = (commentParams:CommentParams) => {
    return request({
        method: 'post',
        url: '/api/comment/addcomment',
        data: commentParams
    })
}
// 获取所有评论信息 
export const getComments=(id:string,pageParams:PageParams)=>{
    return request({
        method: 'post',
        url: `/api/comment/article/${id}`,
        data:pageParams
    })
}