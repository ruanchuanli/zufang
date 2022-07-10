import axios from 'axios'
import { getItems } from '@/utils/storage';

const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
})


// 配置请求拦截
request.interceptors.request.use((config) => { 
  // 添加token
  config.headers.Authorization=getItems('zufangtoken');
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);
export default request
