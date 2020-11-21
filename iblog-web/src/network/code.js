import {request} from "./request";

export function getCode(params) {
  return request({
    url: '/code/getPhoneCode',
    method: 'get',
    params
  })
}
