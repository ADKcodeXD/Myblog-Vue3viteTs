import { pageParams } from '../interface/params';
import request from '@/utils/request'

// 获取当前数据库中所有tags
export const getTagList = () => {
    return request({
        method: 'get',
        url: '/tags/all'
    })
}

// publish 发布文章
export const publishArticle = (articleReqParams: any) => {
    return request({
        method: 'post',
        url: '/articles/publish',
        data: articleReqParams
    })
}

// listARticle 获取文章列表
// params : page pagesize
export const listArticle = (pageParams: pageParams) => {
    return request({
        method: 'post',
        url: '/articles/articlelist',
        data: pageParams
    })
}
// uploadBanner 上传文章头图 获取图片oss地址
// params : File
export const uploadBanner = (imgFile: any) => {
    return request({
        method: 'post',
        url: '/upload/img',
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
        url: `/articles/article/${id}`,
    })
}
// 获取文章首页头图 默认最多获取四条数据
export const getIndexBanner = () => {
    return request({
        method: 'get',
        url: '/articles/indexbanner',
    })
}

// listArticleWithCount 获取文章列表 并返回表中数据总数
// params : page pagesize
export const listArticleWithCount = (pageParams: pageParams) => {
    return request({
        method: 'post',
        url: '/articles/articlelistcount',
        data: pageParams
    })
}