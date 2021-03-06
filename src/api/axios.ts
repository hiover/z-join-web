import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
export const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.REACT_APP_BASE_URL,
  // 超时
  timeout: 10000
})

export const useAxios = makeUseAxios({
  axios: service
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  // const isTok˝en = (config.headers || {}).isToken === false
  // if (getToken() && !isToken) {
  //   config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})


// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态  
  return res.data
},
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

