//封装所有与用户相关的接口函数

import request2 from "@/utils/http2"


export const loginAPI2=({username, password})=>{//利用解构赋值 直接传俩参数，利于维护，他们说如果不去解构的话，都不知道要post什么数据
    return request2.post(
        '/admin/login',
        {       
            username,
            password
        },
       { headers: {
            'Content-Type': 'application/json'
          }

        }
    )
}