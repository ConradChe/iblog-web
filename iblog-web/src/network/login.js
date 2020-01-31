import {request} from "./request";

export function doLogin(data) {
  return request({
    url: '/user/doLogin',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}

export function register(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}
