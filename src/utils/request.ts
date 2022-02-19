import { useStore } from './../store/main';
import axios from 'axios'
import JSONbig from 'json-bigint';

const request: any = axios.create({
    baseURL: "http://adkdream.top/",
    timeout: 5000,
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