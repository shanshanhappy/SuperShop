<script setup>
import { useRouter } from 'vue-router';
const Router=useRouter();
const confirm = () => {
  console.log("退出登录")
  //退出登录业务实现
  //1.清除用户信息
    /*但是我考虑就一个用户所有，我选择先不保存用户信息，之后再做，所以对于1任务就先不做 */
  //2.跳转到登录页面
  Router.replace({ path: '/' });
}




</script>

<template>
  <div class="head">
    <div class="head-left">
      <span>
        <el-icon><Shop /></el-icon
        ><!--图标-->
        SuperShop
      </span>
    </div>
    <div class="head-right">
      <el-icon><FullScreen /></el-icon>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="50" :src="circleUrl" /><!--头像自己定义哈-->
          <span>用户名</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-popconfirm  @confirm="confirm" title="确认退出吗？" confirm-button-text="确认" cancel-button-text="取消">
        <template #reference>
          <a href="javascript:;">退出登录</a>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右分布 */
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* 占满整个宽度 */
}

/* 左侧部分样式 */
.head-left {
  display: flex;
  align-items: center;
}

.head-left span {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.head-left .el-icon {
  margin-right: 8px;
  color: #333;
}

/* 右侧部分样式 */
.head-right {
  display: flex;
  align-items: center;
  gap: 20px; /* 设置右侧图标和下拉菜单之间的间距 */
}

.head-right .el-icon {
  cursor: pointer;
}

/* 下拉菜单样式 */
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 20px;
}

.el-dropdown-link .el-icon--right {
  margin-left: 4px; /* 下拉箭头与文本之间的间距 */
}

.el-avatar {
  border: 1px solid #eee; /* 头像边框 */
}

.el-dropdown-menu {
  font-size: 14px;
}
</style>
