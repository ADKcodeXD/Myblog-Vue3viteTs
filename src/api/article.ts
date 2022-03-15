import { PageParams } from '../interface/params';
import request from '@/utils/request'

// 获取当前数据库中所有tags
export const getTagList = () => {
    return request({
        method: 'get',
        url: '/api/tags/all'
    })
}

// publish 发布文章
export const publishArticle = (articleReqParams: any) => {
    return request({
        method: 'post',
        url: '/api/articles/publish',
        data: articleReqParams
    })
}

// listARticle 获取文章列表
// params : page pagesize
export const listArticle = (pageParams: PageParams) => {
    return request({
        method: 'post',
        url: '/api/articles/articlelist',
        data: pageParams
    })
}
// uploadBanner 上传文章头图 获取图片oss地址
// params : File
export const uploadBanner = (imgFile: any) => {
    return request({
        method: 'post',
        url: '/api/upload/img',
        data: imgFile,
        header: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
// getArticleItem 获取文章详情 渲染文章
// params : articleId 通过query获取 
export const getArticleItem = (id: number) => {
    return request({
        method: 'post',
        url: `/api/articles/article/${id}`,
    })
}
// 获取文章首页头图 默认最多获取四条数据
export const getIndexBanner = () => {
    return request({
        method: 'get',
        url: '/api/articles/indexbanner',
    })
}

// listArticleWithCount 获取文章列表 并返回表中数据总数
// params : page pagesize
export const listArticleWithCount = (pageParams: PageParams) => {
    return request({
        method: 'post',
        url: '/api/articles/articlelistcount',
        data: pageParams
    })
}
// 添加tag
export const addTag = (tagName: string) => {
    return request({
        method: 'get',
        url: `/api/tags/add?tagName=${tagName}`,
    })
}

// get 首页文章 单独新增一个接口 最多获取五篇文章 且都在articleIndex中间表中(可以后台管理)
export const getIndexArticleApi = (pageparams: PageParams) => {
    return request({
        method: 'post',
        url: '/api/articles/indexarticle',
        data: pageparams
    })
}

// 获取文章归档
// get 首页文章 单独新增一个接口 最多获取五篇文章 且都在articleIndex中间表中(可以后台管理)
export const getArticleGroupByTimeApi = () => {
    return request({
        method: 'get',
        url: '/api/articles/articletime'
    })
}

//获取指定数量的 tag taglist
export const getTagListApi = (pageparams:PageParams) => {
    return request({
        method: 'post',
        url: '/api/tags/taglist',
        data:pageparams
    })
}
// 搜索建议

export const getSearchTipApi = (keyword:string) => {
    return request({
        method: 'get',
        url: '/api/articles/searchtip',
        params:{'keyword':keyword}
    })
}
