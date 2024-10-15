import httpInstance from '@/utils/http3'
export const  getGoodsAPI = () => {
    return httpInstance.get({
      url:'/1'
    })
  }