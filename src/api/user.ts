// user/currentUser
import request from '@/utils/request'

// 获取当前user信息
export const currentUser = () => {
    return request({
        method: 'get',
        url: '/user/currentUser'
    })
}

// 获取指定用户信息
export const findUserById = (id:any) => {
    return request({
        method: 'get',
        url: `/user/user?userId=${id}`
    })
}
