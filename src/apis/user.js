//封装所有与用户相关的接口函数
import request from "@/utils/http"

export const loginAPI=({account, password})=>{//利用解构赋值 直接传俩参数，利于维护，他们说如果不去解构的话，都不知道要post什么数据
    return request({
        url:'/login',
        method:'POST',
        data:{         //body体参数
            account,
            password
        }
    })
}