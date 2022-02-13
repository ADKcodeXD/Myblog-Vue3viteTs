import { useStore } from './../store/main';
import axios from 'axios'


const request: any = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 5000
})
//请求拦截器  发请求之前，拦截器可以监测到
request.interceptors.request.use((config: any) => {
    //config 配置对象 
    const store=useStore();
    if (store.user) {
        config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config;
})

request.interceptors.response.use((response: any)=>{
    return response;
})

export default request;