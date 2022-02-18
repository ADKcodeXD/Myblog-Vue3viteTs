// user/currentUser
import { UpdateUserInfoParams } from '@/interface/params'
import request from '@/utils/request'

// 获取当前user信息
export const currentUserApi = () => {
    return request({
        method: 'get',
        url: '/user/currentUser'
    })
}

// 获取指定用户信息
export const findUserById = (id: any) => {
    return request({
        method: 'get',
        url: `/user/user?userId=${id}`
    })
}

// 获取当前user的所有信息（除密码）
export const currentUserAll = () => {
    return request({
        method: 'get',
        url: '/user/currentUserAll'
    })
}

// 修改登录用户的信息
export const updateUserInfoApi = (updateParams: UpdateUserInfoParams) => {
    return request({
        method: 'post',
        url: '/user/updateUserInfo',
        data: updateParams
    })
}