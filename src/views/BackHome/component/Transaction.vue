<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="transaction-business">
      <!-- 左侧商品信息 -->
      <div class="product-info">
        <el-image
          :src="product.image"
          fit="cover"
          style="width: 100%; height: 200px;"
        ></el-image>
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p>价格: ¥{{ product.price }}</p>
          <p>库存: {{ product.stock }}</p>
          <p>描述: {{ product.description }}</p>
        </div>
      </div>
  
      <!-- 右侧购买者选择 -->
      <div class="buyer-list">
        <el-card
          v-for="buyer in buyers"
          :key="buyer.id"
          class="buyer-card"
          @click="selectBuyer(buyer)"
        >
          <p>购买者: {{ buyer.name }}</p>
          <p>联系方式: {{ buyer.contact }}</p>
        </el-card>
      </div>
  
      <!-- 冻结商品的对话框 -->
      <el-dialog
        title="冻结商品"
        v-model="freezeDialogVisible" 
        width="30%"
      ><!-- 使用 v-model 控制显示 -->
        <p>确认冻结商品 "{{product.name}}" 给购买者 "{{selectedBuyer?.name}}" 吗？</p>
  
        <!-- 使用 v-slot:footer 替代 slot="footer" -->
        <template v-slot:footer>
          <el-button @click="freezeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmFreeze">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          image: 'https://via.placeholder.com/200', // 示例图片地址
          name: '商品A',
          price: 100,
          stock: 10,
          description: '这是一个商品的描述。'
        },
        buyers: [
          { id: 1, name: '买家1', contact: '1234567890' },
          { id: 2, name: '买家2', contact: '1234567891' },
          { id: 3, name: '买家3', contact: '1234567892' },
          { id: 4, name: '买家4', contact: '1234567893' },
          { id: 5, name: '买家5', contact: '1234567894' },
          { id: 6, name: '买家6', contact: '1234567895' }
        ],
        freezeDialogVisible: false, // 控制冻结对话框的显示
        selectedBuyer: null
      };
    },
    methods: {
      selectBuyer(buyer) {
        this.selectedBuyer = buyer;
        this.freezeDialogVisible = true;
      },
      confirmFreeze() {
        // 冻结商品逻辑
        this.$message.success(`商品已冻结给购买者 ${this.selectedBuyer.name}`);
        this.freezeDialogVisible = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .transaction-business {
    display: flex;
    gap: 20px;
    padding: 20px;
  }
  
  .product-info {
    width: 40%;
    border-right: 1px solid #ebeef5;
    padding-right: 20px;
  }
  
  .product-details h3 {
    margin: 10px 0;
  }
  
  .buyer-list {
    width: 60%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  
  .buyer-card {
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .buyer-card:hover {
    background-color: #f5f7fa;
  }
  </style>
  