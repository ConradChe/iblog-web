import {request} from "./request";

export function selectUpvoteCountById(params) {
  return request({
    url: '/upvote/selectUpvoteCountById',
    method: 'get',
    params
  })
}

export function selectUpvoteById(params) {
  return request({
    url: '/upvote/selectUpvoteById',
    method: 'get',
    params
  })
}

export function doUpvote(params) {
  return request({
    url: '/upvote/doUpvote',
    method: 'get',
    params
  })
}

export function cancleUpvote(params) {
  return request({
    url: '/upvote/cancleUpvote',
    method: 'get',
    params
  })
}
