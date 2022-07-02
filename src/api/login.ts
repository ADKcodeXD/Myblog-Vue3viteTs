import request from '@/utils/request'

/**
 * 用户登录api
 * @param loginParams 用户登录参数
 * @returns 
 */
export const userLogin = (loginParams:any) => {
    return request({
        method: 'post',
        url: '/api/login',
        data:loginParams
    })
}
/**
 * 用户注册 
 * @param registerParams 用户注册参数
 * @returns 
 */
export const userRegister = (registerParams:any) => {
    return request({
        method: 'post',
        url: '/api/register',
        data:registerParams
    })
}
/**
 * 用户登出 用于删除redis中的缓存信息
 * @returns 
 */
export const userLogout = () => {
    return request({
        method: 'post',
        url: '/api/login/logout',
    })
}