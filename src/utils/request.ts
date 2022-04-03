import { useStore } from './../store/main';
import axios from 'axios'
import JSONbig from 'json-bigint';
const baseUrl=process.env.VITE_BASE_API;
console.log(baseUrl);
const request: any = axios.create({
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
request.interceptors.request.use((config: any) => {
    //config 配置对象 
    const store=useStore();
    if (store.user) {
        config.headers.Authorization = `${store.user.token}`
    }
    return config;
})

request.interceptors.response.use((response: any)=>{
    return response;
})

export default request;