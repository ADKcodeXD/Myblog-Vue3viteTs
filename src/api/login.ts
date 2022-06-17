import request from '@/utils/request'


export const userLogin = (loginParams:any) => {
    return request({
        method: 'post',
        url: '/api/login',
        data:loginParams
    })
}

export const userRegister = (registerParams:any) => {
    return request({
        method: 'post',
        url: '/api/register',
        data:registerParams
    })
}