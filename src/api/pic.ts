import request from '@/utils/request'

/**
 * @Param pageParams 分页参数 用于获取图片
 */
export const getPics = (pageParams : PageParams) => {
    return request({method: 'post', url: '/api/pic/getPics', data: pageParams})
}
/**
 * 添加画廊图片
 * @param picParams 画廊图片所需的参数 
 * @returns 
 */
export const addPic = (picParams : PicParams) => {
    return request({method: 'post', url: '/api/pic/addPic', data: picParams})
}

export const likePic=(picId:string)=>{
    return request({method: 'get', url: '/api/pic/likePic', params:{id:picId}})
}