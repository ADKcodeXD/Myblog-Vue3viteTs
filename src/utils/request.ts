import { ElMessage } from 'element-plus';
import { useStore } from './../store/main';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const baseUrl = process.env.VITE_BASE_API;
const CancelToken = axios.CancelToken; // 用于axios取消请求
const request: AxiosInstance = axios.create({
  baseURL: baseUrl, //生产环境
  timeout: 7000
});
//请求拦截器  发请求之前，拦截器可以监测到
request.interceptors.request.use((config: AxiosRequestConfig) => {
  //config 配置对象
  const store = useStore();
  const source = CancelToken.source();
  const { cancel } = useStore();
  const url = config.url;
  config.cancelToken = source.token;
  if (store.user) {
    config.headers.Authorization = `${store.user.token}`;
  }
  // 当有重复请求的时候 则利用这个方式来取消重复的请求
  if (cancel[url]) {
    delete cancel[url];
  }
  cancel[url] = source.cancel;
  store.setCancel(cancel);
  return config;
});

request.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status > 400) {
      ElMessage.error(response.statusText);
      throw new Error(`请求失败`);
    } else if (response.data.code === 10003) {
      const store = useStore();
      if (store.user.token) {
        store.setUserToken('');
      }
    } else if (response.data.code !== 200) {
      if (response.data.msg) {
        ElMessage.error(response.data.msg);
      }
      throw new Error(response.data.msg);
    }
    return response;
  },
  (err: any) => {
    Promise.reject(err);
  }
);

export default request;
