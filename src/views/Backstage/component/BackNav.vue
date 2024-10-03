<script setup>

</script>

<template>
 <nav class="app-topnav">
  <div class="container">
    <ul>
    
        <li><a href="javascript:;"><i class="iconfont icon-user"></i>商家身份</a></li>
        <li><!--不是很懂下面的是不是有编程语句-->
          <el-popconfirm title="确认退出吗？" confirm-button-text="确认" cancel-button-text="取消">
            <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
          </el-popconfirm>
        </li>
        <li><a href="javascript:;">账号管理</a></li>
     
    </ul>
  </div>
 </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>