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
    /*background-color: $xtxColor; // 头部背景颜色
    display: flex;
    justify-content: space-between; // 两端对齐
    width: 100%; */
    background: linear-gradient(90deg, #4e73df 0%, #1cc88a 100%); // 渐变背景色
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff; // 字体颜色为白色
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // 头部阴影
    height: 60px; // 固定头部高度
  }

  .el-container {
    flex: 1; // 让内容区域占满剩余高度
    display: flex;
    min-height: 0; // 修复 flex 布局中的滚动问题

    .el-aside {
      /*background-color: #e3eaf2; // 侧边栏背景颜色
      padding: 20px;
      box-sizing: border-box;
      color: #333;
      font-size: 16px;*/
      background-color: #2f3640; // 深色侧边栏背景
      padding: 20px;
      box-sizing: border-box;
      color: #fff; // 侧边栏文字颜色为白色
      font-size: 16px;
      width: 220px; // 设置固定宽度
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-right: 1px solid rgba(255, 255, 255, 0.1); // 细分隔线
    }

    .el-main {
      /*background-color: #f9fafb; // 主体背景颜色
      padding: 20px;
      box-sizing: border-box;
      color: #333;
      font-size: 16px;*/
      background-color: #f4f6f9; // 主体背景颜色
      padding: 30px; // 主体内容更大的内边距
      box-sizing: border-box;
      color: #333;
      font-size: 16px;
      overflow-y: auto; // 使主体内容可滚动
      border-radius: 12px; // 增加圆角效果
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); // 主体区域阴影
    }
  }
}
</style>
