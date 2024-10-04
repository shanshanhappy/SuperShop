<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="purchase-product">
      <!-- 商品信息展示 -->
      <div class="product-info">
        <el-image
          :src="product.image"
          fit="cover"
          style="width: 100%; height: 200px;"
        ></el-image>
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p>价格: ¥{{ product.price }}</p>
          <p>描述: {{ product.description }}</p>
        </div>
      </div>
  
      <!-- 购买按钮 -->
      <el-button type="primary" @click="onPurchase">购买</el-button>
  
      <!-- 购买信息输入对话框 -->
      <el-dialog
  title="填写购买信息"
  v-model="purchaseDialogVisible"
  width="30%"
>
  <el-form ref="purchaseForm" :model="buyerInfo" :rules="rules">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="buyerInfo.name" placeholder="请输入姓名"></el-input>
    </el-form-item>

    <el-form-item label="手机号" prop="phone">
      <el-input v-model="buyerInfo.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>

    <el-form-item label="微信号" prop="wechat">
      <el-input v-model="buyerInfo.wechat" placeholder="请输入微信号"></el-input>
    </el-form-item>
  </el-form>

  <!-- 使用 v-slot:footer 单独包含底部按钮 -->
  <template #footer>
    <el-button @click="purchaseDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitPurchase">提交</el-button>
  </template>
</el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          image: 'https://via.placeholder.com/200',
          name: '商品A',
          price: 100,
          description: '这是一个商品的描述。'
        },
        purchaseDialogVisible: false, // 控制对话框显示
        buyerInfo: {
          name: '',
          phone: '',
          wechat: ''
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
          ],
          wechat: [{ required: true, message: '请输入微信号', trigger: 'blur' }]
        }
      };
    },
    methods: {
      onPurchase() {
        this.purchaseDialogVisible = true; // 打开填写信息对话框
      },
      submitPurchase() {
        this.$refs.purchaseForm.validate((valid) => {
          if (valid) {
            this.$message.success(`成功购买了 ${this.product.name}`);
            this.purchaseDialogVisible = false; // 关闭对话框
            this.resetForm(); // 重置表单
          } else {
            this.$message.error('请完善购买信息！');
          }
        });
      },
      resetForm() {
        this.buyerInfo = {
          name: '',
          phone: '',
          wechat: ''
        };
        this.$refs.purchaseForm.resetFields();
      }
    }
  };
  </script>
  
  <style scoped>
  .purchase-product {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  .product-info {
    text-align: center;
  }
  .product-details h3 {
    margin: 10px 0;
  }
  </style>
  