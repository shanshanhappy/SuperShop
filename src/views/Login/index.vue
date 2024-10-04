<!-- eslint-disable vue/multi-word-component-names -->

<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
//上面的，视频都没写
import { ref } from 'vue'
import { loginAPI2 } from '@/apis/user'
import { useRouter } from 'vue-router'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
//一.表单校验功能（账号名+密码）
//1.准备表单对象
const form = ref({
      username:'',
      password:'',
      agree:false
})

//2.准备规则对象
const rules = {
  username:[
    {required:true, message:'请输入账号', trigger:'blur'},//md这个是什么鬼触发
  ],
  password:[
    {required:true, message:'请输入密码', trigger:'blur'},//用户名与密码只需要通过配置就可以进行校验
    {min:1,max:14,message:"密码长度为6到14",trigger:'blur'}
  ],
  //3.勾选选项自定义校验
  agree:[
    {
      validator:(rule,value,callback)=>{
       //自定义校验逻辑
       //勾选就通过，不勾选就不通过
        if(value){
          callback()//这个不管成功与失败一定要执行
        }else{
           callback(new Error('请勾选同意条款'))
         }
      }
   }
  ]
}

//二.获取form实例做统一校验
const formRef = ref(null)
const router = useRouter()
//const {username,password}=form.value//获取表单的两个字段
const doLogin = ()=>{
//调用实例方法
formRef.value.validate(async(valid) => {
     if(valid){
         // TODO LOGIN
     const res =await loginAPI2(form.value)//调用api验证账户是否正确,
     console.log(res)

      // 1. 提示用户
      ElMessage({ type: 'success', message: '登录成功' })
     //2.利用cookies存储用户信息，但是现在只有一个用户先不写了

     //3.验证成功后跳转到相关页面
      router.replace({ path: '/back' })
     }else{
      console.log('登录失败')
      return false
     }
  })
}
</script>

<template>
  <el-row class="total">
    <el-col :span="16" class="left">
      <h1>左边写写欢迎的话与提示的话，对了这里应该返回首页的链接</h1>
    </el-col>
    <el-col :span="8" class="right">
    
      <section >
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form"> <!--绑定对象获取表单实例-->
            <el-form ref="formRef"  :model="form"  :rules="rules" label-position="right" label-width="60px"   status-icon> <!--给这个表单绑定model属性，啊我不知道这个model属性是干什么的-->
              <el-form-item prop="username"  label="账户">
                <el-input v-model="form.username"/><!--为啥这个是双向绑定呀-->
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password"/>
              </el-form-item>
              <el-form-item prop="agree" label-width="22px"><!--实现校验规则-->
                <el-checkbox  size="large" v-model="form.agree"><!--绑定对象-->
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button><!--给登入按钮绑定事件-->
            </el-form>
          </div>
        </div>
      </div>
    </section>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.total {
  display: flex;
  min-height: 100vh; // 100% height of the viewport
}

.left {
  background-color: aquamarine;

  /* 你可以根据需要添加更多样式 */
}

.right {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* 你可以根据需要添加更多样式 */
 
}
.wrapper {
    width: 480px;
    background: #fff;
    left: 50%;
    top: 54px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }

  .account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}


</style>
