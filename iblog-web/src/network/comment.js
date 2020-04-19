import {request} from "./request";

/**
* @Description 新增评论
* @Author  ConradChe
* @Date   2020/4/11 15:31
* @Param
* @Return
* @Exception
*
*/
export function insertComment(data) {
  return request({
    url: '/comment/insertComment',
    method: 'post',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}

/**
* @Description 查询评论
* @Author  ConradChe
* @Date   2020/4/11 16:25
* @Param  
* @Return      
* @Exception   
* 
*/
export function queryComment(params) {
  return request({
    url: '/comment/queryComment',
    method: 'get',
    params
  })
}
