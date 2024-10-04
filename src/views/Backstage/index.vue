<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import BackHead from './component/BackHead.vue'
import BackMenu from './component/BackMenu.vue'


</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <BackHead />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <BackMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .el-header {
    background-color: $xtxColor; // 头部背景颜色
    display: flex;
    justify-content: space-between; // 两端对齐
    width: 100%; 
  }

  .el-container {
    flex: 1; // 让内容区域占满剩余高度
    display: flex;

    .el-aside {
      background-color: #e3eaf2; // 侧边栏背景颜色
      padding: 20px;
      box-sizing: border-box;
      color: #333;
      font-size: 16px;
    }

    .el-main {
      background-color: #f9fafb; // 主体背景颜色
      padding: 20px;
      box-sizing: border-box;
      color: #333;
      font-size: 16px;
    }
  }
}
</style>
