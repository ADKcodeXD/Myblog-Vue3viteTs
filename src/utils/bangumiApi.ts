import { useBangumiUser } from './../store/bangumiUser';
import axios from 'axios';

const baseUrl = process.env.VITE_APP_BGM_BASE_API;

// bangumi api
const bangumiRequest: any = axios.create({
  baseURL: baseUrl, //bam api 参考github上的
  timeout: 8000
});
//请求拦截器  发请求之前，拦截器可以监测到
bangumiRequest.interceptors.request.use((config: any) => {
  // config 配置对象
  // 先暂时不用这个 等我搞明白了登录和回调再来
  const bangumiStore = useBangumiUser();
  if (bangumiStore.access_token) {
    config.headers.Authorization = `Bearer ${bangumiStore.access_token}`;
  }
  return config;
});

bangumiRequest.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export default bangumiRequest;
