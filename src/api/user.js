import request from '@/utils/request'
// login
export const login = (data)=>request({
    url:'/user/login',
    method: 'POST',
    data
})

// 获取个人信息
export const userinfo = ()=>request({
    url:'/user',
})

// 我的收藏
export const mycollect = ()=>request({
    url:'/user/favorites',
})

// 是否收藏房屋 iscollecthome
export const iscollecthome = (id)=>request({
    url:`/user/favorites/${id}`,
})

// 添加收藏房屋 collecthome
export const collecthome = (id)=>request({
    url:`/user/favorites/${id}`,
    method: 'post'
})

// 取消收藏房屋 collecthome
export const delhome = (id)=>request({
    url:`/user/favorites/${id}`,
    method: 'delete'
})

// 发布房源
export const puthome = (data)=>request({
    url:`/user/houses`,
    method: 'post',
    data
})

// 查看已发布的房源
export const getputhome = ()=>request({
    url:`/user/houses`,
})
