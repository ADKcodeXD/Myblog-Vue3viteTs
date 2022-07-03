import request from '@/utils/request';

// 获取当前user信息
export const currentUserApi = () => {
  return request({
    method: 'get',
    url: '/api/user/currentUser'
  });
};

// 获取指定用户信息
export const findUserById = (id: any) => {
  return request({
    method: 'get',
    url: `/api/user/user?userId=${id}`
  });
};

// 获取当前user的所有信息（除密码）
export const currentUserAll = () => {
  return request({
    method: 'get',
    url: '/api/user/currentUserAll'
  });
};

// 修改登录用户的信息
export const updateUserInfoApi = (updateParams: UpdateUserInfoParams) => {
  return request({
    method: 'post',
    url: '/api/user/updateUserInfo',
    data: updateParams
  });
};

// 用户点赞功能
export const userLike = (likeParams: LikeOrCollectParams) => {
  return request({
    method: 'post',
    url: '/api/user/like',
    data: likeParams
  });
};

// 用户收藏功能
export const userCollect = (collectParams: LikeOrCollectParams) => {
  return request({
    method: 'post',
    url: '/api/user/collect',
    data: collectParams
  });
};
/**
 * 获取当前登录用户的收藏 需要分页参数 默认是一页十条
 * @param pageParams
 */
export const getUserCollect = (pageParams: PageParams = { page: 1, pagesize: 10 }) => {
  return request({
    method: 'post',
    url: '/api/userset/findmycollect',
    data: pageParams
  });
};
/**
 * 获取当前用户的点赞 同样需要分页参数
 * @param pageParams
 * @returns
 */
export const getUserLiked = (pageParams: PageParams = { page: 1, pagesize: 10 }) => {
  return request({
    method: 'post',
    url: '/api/userset/findmylike',
    data: pageParams
  });
};
/**
 * 删除我的收藏的文章 需要一个文章id
 * @param articleId
 * @returns
 */
export const deleteUserCollect = (articleId: string) => {
  return request({
    method: 'delete',
    url: `/api/userset/deletemycollect/${articleId}`
  });
};

/**
 * 取消我的点赞过的文章 需要一个文章id
 * @param articleId
 * @returns
 */
export const deleteUserLiked = (articleId: string) => {
  return request({
    method: 'delete',
    url: `/api/userset/deletemyliked/${articleId}`
  });
};
