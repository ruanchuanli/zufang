import request from '@/utils/request'

export const gethomebycityid = (params) =>
  request({
    url: '/houses',
    params,
  })

export const getzicity = (params) =>
  request({
    url: '/area',
    params,
  })

export const getcondition = (params) =>
  request({
    url: '/houses/condition',
    params,
  })

  export const seachhome = (params) =>
  request({
    url: '/houses',
    params,
  })
