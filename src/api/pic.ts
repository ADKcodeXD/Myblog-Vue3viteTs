import request from '@/utils/request';

/**
 * @Param pageParams 分页参数 用于获取图片
 */
export const getPics = (pageParams: PageParams) => {
  return request({ method: 'post', url: '/api/pic/getPics', data: pageParams });
};
/**
 * 添加画廊图片
 * @param picParams 画廊图片所需的参数
 * @returns
 */
export const addPic = (picParams: PicParams) => {
  return request({ method: 'post', url: '/api/pic/addPic', data: picParams });
};
/**
 * 点赞图片 无需登录 一分钟最多20次
 * @param picId 图片id
 * @returns
 */
export const likePic = (picId: string) => {
  return request({
    method: 'get',
    url: '/api/pic/likePic',
    params: {
      id: picId
    }
  });
};

/**
 * 修改图片信息接口
 * @param picParams 修改图片的参数
 * @returns
 */
export const updateMyPic = (picParams: PicParams) => {
  return request({ method: 'post', url: '/api/pic/updateMyPic', data: picParams });
};

/**
 * 删除自己发布的图片
 * @param id 图片的id
 * @returns
 */
export const deleteMyPic = (id: string | number) => {
  return request({ method: 'post', url: `/api/pic/deleteMyPic/${id}` });
};
/**
 * 获取发布的图片
 * @param pageParams 分页参数 获取自己发布的图片
 * @returns
 */
export const getMyPic = (pageParams: PageParams) => {
  return request({ method: 'post', url: `/api/pic/getMyPics`, data: pageParams });
};
