<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="account-management">
    <el-form
        ref="accountForm"
        :model="account"
        :rules="computedRules"
        label-width="100px"
        class="account-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="account.username" :disabled="!isEditing" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="account.email" :disabled="!isEditing" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="account.phone" :disabled="!isEditing" placeholder="请输入联系方式"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input
            type="textarea"
            v-model="account.address"
            :disabled="!isEditing"
            placeholder="请输入地址"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button v-if="!isEditing" type="primary" @click="onEdit" class="edit-button">编辑</el-button>
        <el-button v-else type="primary" @click="onSave" class="save-button">保存</el-button>
        <el-button v-if="isEditing" @click="onCancel" class="cancel-button">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false, // 控制是否处于编辑状态
      account: {
        username: '张三',
        email: 'zhangsan@example.com',
        phone: '1234567890',
        address: '浙江省杭州市'
      },
      defaultRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    };
  },
  computed: {
    computedRules() {
      return this.isEditing ? this.defaultRules : {}; // 编辑时启用校验，非编辑时禁用
    }
  },
  methods: {
    onEdit() {
      this.isEditing = true; // 启用编辑模式
    },
    onSave() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          this.isEditing = false; // 关闭编辑模式
          this.$message.success('账号信息已保存！');
          // 可以在这里调用 API 将修改后的信息发送到服务器
        } else {
          this.$message.error('请完善账号信息！');
        }
      });
    },
    onCancel() {
      this.isEditing = false; // 取消编辑，重置表单状态
      this.$refs.accountForm.resetFields(); // 重置表单为初始值
    }
  }
};
</script>

<style scoped>
.account-management {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.account-form {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.el-form-item {
  margin-bottom: 24px;
}

.el-input__inner {
  border-radius: 6px;
  transition: border-color 0.3s;
}

.el-input__inner:focus {
  border-color: #409eff;
}

.edit-button,
.save-button,
.cancel-button {
  min-width: 100px;
  border-radius: 6px;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button:hover,
.save-button:hover {
  background-color: #66b1ff;
}

.cancel-button {
  color: #f56c6c;
  border-color: #f56c6c;
}

.cancel-button:hover {
  background-color: #fde2e2;
}

.el-form--disabled .el-input__inner {
  background-color: #f5f7fa;
}

.el-form--disabled .el-button {
  background-color: #ebeef5;
  border-color: #ebeef5;
  color: #c0c4cc;
  pointer-events: none;
}
</style>
