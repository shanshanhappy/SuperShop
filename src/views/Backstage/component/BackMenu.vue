<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeMenuItem = ref(null); // 用来保存当前激活的菜单项

//改进了没有选中菜单项时第一个菜单为被选中状态的问题
// 设置默认激活的菜单项
onMounted(() => {
  const currentPath = router.currentRoute.value.path; // 获取当前路由的路径
  // 如果当前路径与菜单匹配，则设置为默认选中项；否则保持为空
  if (["/back/transaction", "/back/addproduct", "/back/history", "/back/account"].includes(currentPath)) {
    activeMenuItem.value = currentPath;
  } else {
    activeMenuItem.value = null; // 不选中任何菜单项
  }
});

// 处理菜单项选择事件
const handleSelect = (index) => {
  console.log(index);
  router.push({ path: index });
  activeMenuItem.value = index; // 更新激活菜单项
};
</script>

<template>
  <div class="menu-container">
    <!-- 绑定 :default-active="activeMenuItem"，去掉硬编码的默认值 -->
    <el-menu :default-active="activeMenuItem" class="el-menu-vertical-demo custom-menu" @select="handleSelect">
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
