import {request} from "./request";

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}

export function queryUserInfo() {
  return request({
    url: '/user/queryUserInfo'
  })
}
