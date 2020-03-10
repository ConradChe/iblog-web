import axios from 'axios'
import {getToken,getUser} from '@/request/token'
import {Loading} from 'element-ui'
import {Message} from 'element-ui'
import router from '@/router'

let loading;
function startLoading () {
  loading = Loading.service({    /*在需要调用时：*/
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0,7)'
  });
}

function endLoading () {
  loading.close();
}


export function request(config) {
  const instance = new axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    //加载动画
    startLoading();
    //拦截后需要将拦截下来的请求数据返回发送
    if (getToken()) {
      config.headers['loginToken'] = getToken()
    }
    return config;
  }, err => {
    Promise.reject(err)
  })

  // 相应拦截器
  instance.interceptors.response.use(response => {
    //结束加载动画
    endLoading();
    // 拦截后需要将拦截下来处理成的结果返回
    let data = response.data
    if (data.code !== 200){
      let code = data.code
      if (code === 401){
        Message({
          type: 'warning',
          showClose: true,
          message: '请先登录'
        })
        router.push('/login')
      }
    } else {
      return response.data;
    }

  }, err => {
    endLoading();
    Message({
      type: 'warning',
      showClose: true,
      message: '连接超时'
    })
    return Promise.reject(err)
  })

  return instance(config)
}
