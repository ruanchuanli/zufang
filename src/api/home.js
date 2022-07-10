import request from '@/utils/request'
// 轮播图
export const getimg = () =>
  request({
    url: '/home/swiper',
  })

// 租房小屋
export const getxiaowu = (params) =>
  request({
    url: '/home/groups',
    params,
  })

  // 房屋详细信息
export const getinfo = (id) =>
request({
  url: `/houses/${id}`,
})
  
 // 获取发布房屋所需信息
 export const puthomeinfo = () =>
 request({
   url: `/houses/params`,
 })

  // 获取发布房屋所需信息
  export const getaddress = (params) =>
  request({
    url: `/area/community`,
    params
  })

  // 获取发布房屋所需信息
  export const getimgs = (data) =>
  request({
    url: `/houses/image`,
    method: 'post',
    data
  })
 
  