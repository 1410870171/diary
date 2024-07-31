import router from '@/router';
import axios from 'axios';
import { showToast } from 'vant';

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'


// 请求拦截
axios.interceptors.request.use(req => {
  let jwtToken = window.localStorage.getItem('token')
  if (jwtToken) {
    req.headers.Authorization = jwtToken
  }
  return req
})

// 响应拦截
axios.interceptors.response.use(res => {
  if (res.status !== 200) {  // 程序错误
    showToast('服务器异常');
    return Promise.reject(res)
  } else {

    if (res.data.status === 401) {  // 登录失效
      showToast(res.data.msg);
      router.push('/login')
      return Promise.reject(res)
    }

    if (res.data.code !== '8000') {  // 逻辑性错误
      showToast(res.data.msg);
      return Promise.reject(res)
    }

    return res.data
  }
})

export default axios