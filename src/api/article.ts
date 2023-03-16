import request from '@/utils/request'

/**
 * 获取所有的标签 非分页获取
 * @returns
 */
export const getTagList = () => {
  return request({
    method: 'get',
    url: '/api/tags/all'
  })
}

/**
 * 发布文章 需要登录才能发布 后端做好了限制
 * @param articleReqParams 一个文章发布的params
 * @returns
 */
export const publishArticle = (articleReqParams: any) => {
  return request({
    method: 'post',
    url: '/api/articles/publish',
    data: articleReqParams
  })
}
/**
 * uploadImage 用于上传图片 获取图片oss地址
 * 设置了60s的超时时间
 * @param imgFile 上传的文件
 * @param cb 用于接受上传的进度的函数 可以在这个函数里获取到一个progressEvent
 * @returns
 */
export const uploadImage = (imgFile: any, cb?: any) => {
  return request({
    method: 'post',
    url: '/api/upload/img',
    data: imgFile,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: e => {
      if (e.lengthComputable) {
        if (cb) cb(e)
      }
    },
    timeout: 60000
  })
}
/**
 * uploadImageToLocal 用于上传图片到本地  获取图片的本地地址 用于解决oss流量贵的问题
 * 设置了60s的超时时间
 * @param imgFile 上传的文件
 * @param cb 用于接受上传的进度的函数 可以在这个函数里获取到一个progressEvent
 * @returns
 */
export const uploadImageToLocal = (imgFile: any, cb?: any) => {
  return request({
    method: 'post',
    url: '/api/upload/imglocal',
    data: imgFile,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: e => {
      if (e.lengthComputable) {
        if (cb) cb(e)
      }
    },
    timeout: 60000
  })
}
/**
 * getArticleItem 获取文章详情 渲染文章
 * @param id articleId 通过query获取
 * @returns
 */
export const getArticleItem = (id: number | string) => {
  return request({
    method: 'post',
    url: `/api/articles/article/${id}`
  })
}
/**
 * 获取文章首页头图 默认最多获取四条数据
 * @returns
 */
export const getIndexBanner = () => {
  return request({
    method: 'get',
    url: '/api/articles/indexbanner'
  })
}

/**
 * 获取文章的列表
 * @param pageParams
 * @returns
 */
export const listArticleWithCount = (pageParams: PageParams) => {
  return request({
    method: 'post',
    url: '/api/articles/articlelistcount',
    data: pageParams
  })
}

/**
 * 提供标签名即可添加标签
 * @param tagName 标签名
 * @returns
 */
export const addTag = (tagName: string) => {
  return request({
    method: 'get',
    url: `/api/tags/add?tagName=${tagName}`
  })
}

/**
 * 获取首页的文章 从单独的表中获取 和原表不关联
 * @param pageparams 分页参数
 * @returns
 */
export const getIndexArticleApi = (pageparams: PageParams) => {
  return request({
    method: 'post',
    url: '/api/articles/indexarticle',
    data: pageparams
  })
}

/**
 * 获取文章的发布时间信息
 * @returns 文章归档信息
 */
export const getArticleGroupByTimeApi = () => {
  return request({
    method: 'get',
    url: '/api/articles/articletime'
  })
}

/**
 * 分页获取标签
 * @param pageparams 分页参数
 * @returns
 */
export const getTagListApi = (pageparams: PageParams) => {
  return request({
    method: 'post',
    url: '/api/tags/taglist',
    data: pageparams
  })
}
/**
 * 获取搜索联想关键词
 * @param keyword 关键词
 * @returns
 */
export const getSearchTipApi = (keyword: string) => {
  return request({
    method: 'get',
    url: '/api/articles/searchtip',
    params: { keyword: keyword }
  })
}
/**
 * 获取自己所写的所有文章列表 包括私有和公开的
 * @param pageparams 分页参数 获取自己所写的文章
 * @returns
 */
export const getMyArticles = (pageparams: PageParams) => {
  return request({
    method: 'post',
    url: '/api/articles/myarticle',
    data: pageparams
  })
}
/**
 * 修改自己的文章 需要登录
 * @param articleReqParams 文章参数
 * @returns
 */
export const updateMyArticle = (articleReqParams: ArticleReqParams) => {
  return request({
    method: 'post',
    url: '/api/articles/updatemyarticle',
    data: articleReqParams
  })
}
/**
 * 删除指定的文章 需要自己的文章
 * @param id 文章的id参数
 * @returns
 */
export const deleteMyArticle = (id: string) => {
  return request({
    method: 'post',
    url: `/api/articles/deletemyarticle/${id}`
  })
}
/**
 * 切换文章的显示状态 可以设置私有或者公开
 * @param id 文章id
 * @returns
 */
export const switchMyArticle = (id: string) => {
  return request({
    method: 'post',
    url: `/api/articles/switcharticlestate/${id}`
  })
}
