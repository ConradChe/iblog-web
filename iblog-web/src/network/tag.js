import {request} from "./request";

export function getTags() {
  return request({
    url: '/tag/queryTags'
  })
}
