import { ElMessage } from 'element-plus';
import { useStore } from './../store/main';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import JSONbig from 'json-bigint';
const baseUrl=process.env.VITE_BASE_API;
const CancelToken = axios.CancelToken; // 用于axios取消请求
const request: AxiosInstance = axios.create({
    baseURL: baseUrl, //生产环境
    timeout: 7000,
    transformResponse: [function (data) {
        try {
          return JSONbig.parse(data)
        } catch (err) {
          return data
        }
    }]
})
//请求拦截器  发请求之前，拦截器可以监测到
request.interceptors.request.use((config: AxiosRequestConfig) => {
    //config 配置对象
    const store=useStore();
    const source = CancelToken.source();
    const {cancel}=useStore();
    const url=config.url;
    config.cancelToken = source.token;
    if (store.user) {
        config.headers.Authorization = `${store.user.token}`
    }
    // 当有重复请求的时候 则利用这个方式来取消重复的请求
    if(cancel[url]){
        cancel[url]('重复请求');
        delete cancel[url];
    }
    cancel[url]=source.cancel;
    store.setCancel(cancel);
    return config;
})

request.interceptors.response.use((response: any)=>{
    if(response.status>400){
        ElMessage.error(response.message)
    }
    return response;
},(err:any)=>{
    ElMessage.error('请求失败')
})

export default request;