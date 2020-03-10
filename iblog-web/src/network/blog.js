import {request} from "./request";

export function addBlog(data) {
  return request({
    url: '/blog/addBlog',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}

export function findBlog(params) {
  return request({
    url: '/blog/findBlogs',
    method: 'get',
    params
  })
}