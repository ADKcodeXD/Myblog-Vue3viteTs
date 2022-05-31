import { ElMessage } from 'element-plus';
import { useStore } from './../store/main';
import axios from 'axios'
import JSONbig from 'json-bigint';
const baseUrl=process.env.VITE_BASE_API;

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
    if(response.status>400){
        ElMessage.error(response.message)
    }
    return response;
},(err:any)=>{
    ElMessage.error('请求失败')
})

export default request;