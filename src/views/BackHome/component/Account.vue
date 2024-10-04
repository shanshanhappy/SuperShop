<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="account-management">
      <el-form
        ref="accountForm"
        :model="account"
        :rules="rules"
        label-width="100px"
        class="account-form"
        :disabled="!isEditing" 
      ><!--控制表单是否为只读状态-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="account.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
  
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="account.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
  
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="account.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
  
        <el-form-item label="地址" prop="address">
          <el-input
            type="textarea"
            v-model="account.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button v-if="!isEditing" type="primary" @click="onEdit">编辑</el-button>
          <el-button v-else type="primary" @click="onSave">保存</el-button>
          <el-button v-if="isEditing" @click="onCancel">取消</el-button>
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
        rules: {
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
    methods: {
      onEdit() {
        this.isEditing = true;
      },
      onSave() {
        this.$refs.accountForm.validate((valid) => {
          if (valid) {
            this.isEditing = false;
            this.$message.success('账号信息已保存！');
            // 可以在这里调用 API 将修改后的信息发送到服务器
          } else {
            this.$message.error('请完善账号信息！');
          }
        });
      },
      onCancel() {
        this.isEditing = false;
        this.$refs.accountForm.resetFields(); // 重置表单为初始值
      }
    }
  };
  </script>
  
  <style scoped>
  .account-management {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>