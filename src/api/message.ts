import { PageParams } from '@/interface/params';
import { MessageParamsForADK } from '@/interface/params';
import request from '@/utils/request';


// 添加留言 
export const addMessageApi = (messageParams: MessageParamsForADK) => {
    return request({
        method: 'post',
        url: '/message/addmsg',
        data: messageParams
    })
}
// 获取所有留言
export const getMessageApi = (pageParams: PageParams) => {
    return request({
        method: 'post',
        url: '/message/findmsg',
        data: pageParams
    })
}