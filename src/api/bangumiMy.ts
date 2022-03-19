
import { BroswerParams } from '@/interface/bangumiApi.type';
import request from '@/utils/request';


// 我自己使用爬虫爬取的数据
export const getBroswerDataApi = (bgmRankParams:BroswerParams) => {
    return request({
        method: 'post',
        url: '/api/bgmrank/getindex',
        data: bgmRankParams
    })
}