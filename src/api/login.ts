import request from '@/utils/request'


export const userLogin = (loginParams:any) => {
    return request({
        method: 'post',
        url: '/login',
        data:loginParams
    })
}