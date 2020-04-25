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

export function updateBlog(data) {
  return request({
    url: '/blog/updateBlog',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}

export function hideBlog(data) {
  return request({
    url: '/blog/hideBlog',
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

export function queryBlogOfUser(params) {
  return request({
    url: '/blog/queryBlogOfUser',
    method: 'get',
    params
  })
}

export function deleteBlog(params) {
  return request({
    url: '/blog/deleteBlog/'+params.blogId,
    method: 'delete',
    params
  })
}

export function setBlogView(params) {
  return request({
    url: '/blog/setBlogView',
    method: 'get',
    params
  })
}

export function queryBlogByStatus(params) {
  return request({
    url: '/blog/queryBlogByStatus',
    method: 'get',
    params
  })
}

export function queryBlogInfo(params) {
  return request({
    url: '/blog/queryBlogInfo',
    method: 'get',
    params
  })
}

export function updateBlogStatus(data) {
  return request({
    url: '/blog/updateBlogStatus',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}
