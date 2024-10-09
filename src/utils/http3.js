//axios基础封装
import axios from "axios";
import { ElMessage } from 'element-plus'
const  httpInstance = axios.create({
    baseURL: '/apis',
 
    timeout: 5000
})
  // axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
   /// 确保 e.response 和 e.response.data 存在
   const message = e.response?.data?.message || '请求出错，请稍后再试';
   // 统一错误提示
   ElMessage({
     type: 'warning',
     message: message
   });
  return Promise.reject(e)
})
export default httpInstance