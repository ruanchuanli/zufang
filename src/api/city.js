import request from '@/utils/request'
// 城市列表
export const getcitylist = (params) =>
  request({
    url: '/area/city',
    params,
  })
// 热门城市
export const gethotcity = () =>
  request({
    url: '/area/hot',
  })

//根据城市id获取该城市下的地名坐标信息
export const citypoint = (params) =>
  request({
    url: '/area/map',
    params,
  })
