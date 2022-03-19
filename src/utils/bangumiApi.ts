import { useStore } from './../store/main';
import axios from 'axios'


// bangumi api  
const bangumiRequest: any = axios.create({
    baseURL: "https://api.bgm.tv/", //bam api 参考github上的
    timeout: 8000,
    
})
//请求拦截器  发请求之前，拦截器可以监测到
bangumiRequest.interceptors.request.use((config: any) => {
    //config 配置对象 
    // 先暂时不用这个 等我搞明白了登录和回调再来
    // const store=useStore();
    // if (store.user) {
    //     config.headers.Authorization = `${store.user.token}`
    // }
    return config;
})

bangumiRequest.interceptors.response.use((response: any)=>{
    return response;
})

export default bangumiRequest;