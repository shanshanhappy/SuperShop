<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const handleSelect = (index) => { 
    //定义选择菜单内容事件}
    console.log(index)
    router.push({ path: index })
}
</script>
<template>
      <div class="menu-container">
    <el-menu default-active="/back/transaction" class="el-menu-vertical-demo custom-menu" @select="handleSelect">
      <el-menu-item index="/back/transaction">
        <span>交易业务</span>
      </el-menu-item>
      <el-menu-item index="/back/addproduct">
        <span>添加商品</span>
      </el-menu-item>
      <el-menu-item index="/back/history">
        <span>交易历史</span>
      </el-menu-item>
      <el-menu-item index="/back/account">
        <span>账号管理</span>
      </el-menu-item>
    </el-menu>
  </div>
  </template>
  <style scoped lang="scss">
  .menu-container {
    width: 100%; /* 设置菜单宽度 */
    border-right: 1px solid #e5e5e5; /* 添加右侧边框 */
  }
  
  .custom-menu {
    background-color: #f5f5f5; /* 菜单背景颜色 */
    border-radius: 8px; /* 圆角 */
  }
  
  .custom-menu .el-menu-item {
    color: #606266; /* 字体颜色 */
    font-weight: 500;
  }
  
  .custom-menu .el-menu-item:hover {
    background-color: #c6e0f5; /* 悬停背景颜色 */
    color: #409eff; /* 悬停字体颜色 */
  }
  
  .custom-menu .el-menu-item.is-active {
    background-color: $xtxColor; /* 活跃项背景颜色 */
    color: #fff; /* 活跃项字体颜色 */
  }
  </style>