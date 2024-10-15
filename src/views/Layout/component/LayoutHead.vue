<script setup>
// 使用路由
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 登录按钮，点击切换页面 -->
        <li>
          <a href="javascript:;" @click="router.push('/login')">
            <i class="icon-login"></i>身份切换
          </a>
        </li>
        <!-- 帮助中心和关于我们 -->
        <li><a href="javascript:;"><i class="icon-help"></i>帮助中心</a></li>
        <li><a href="javascript:;"><i class="icon-about"></i>关于我们</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  //background: linear-gradient(135deg, #50c9c3 0%, #96deda 100%); /* 渐变背景 */
  background: linear-gradient(90deg, #4e73df 0%, #1cc88a 100%); // 渐变背景色
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 阴影效果
  padding: 10px 0; // 导航栏内边距
  margin-bottom: 20px;

  .container {
    max-width: 1200px; // 设置容器的最大宽度
    margin: 0 auto; // 居中布局
    padding: 0 20px; // 内边距
  }

  ul {
    display: flex;
    justify-content: flex-end; // 项目居右对齐
    align-items: center;
    list-style: none; // 去掉列表项的默认样式

    li {
      margin-left: 20px; // 项目之间的间距

      a {
        padding: 8px 15px; // 链接内边距
        color: #ffffff; // 字体颜色
        font-size: 16px; // 字体大小
        text-decoration: none; // 去掉下划线
        display: flex; // 使用flex布局
        align-items: center; // 图标和文字垂直居中
        border-radius: 8px; // 圆角

        i {
          font-size: 18px; // 图标的大小
          margin-right: 8px; // 图标和文字的间距
        }

        &:hover {
          color: #ffecb3; // 悬停时的文字颜色
          background-color: rgba(255, 255, 255, 0.1); // 悬停时背景变亮
          transition: background-color 0.3s, color 0.3s; // 添加平滑的过渡效果
        }
      }

      // 第一个li不带边框，后续带左边框分割线
      &:not(:first-child) a {
        border-left: 2px solid rgba(255, 255, 255, 0.5); // 左侧分割线
      }
    }
  }
}
</style>
