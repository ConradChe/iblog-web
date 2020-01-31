import {request} from "./request";

export function getCategory(userId) {
  return request({
    url: '/category/queryCategory',
    params:{
      userId
    }
  })
}
