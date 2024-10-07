<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="transaction-history">
      <el-table :data="transactionData" stripe style="width: 100%">
        <el-table-column prop="transactionId" label="交易 ID" width="150" />
        <el-table-column prop="productName" label="商品名称" width="200" />
        <el-table-column prop="date" label="交易日期" width="180" />
        <el-table-column prop="quantity" label="数量" width="100" />
        <el-table-column prop="totalAmount" label="总金额" width="150" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 交易详情对话框 -->
      <el-dialog v-model="dialogVisible" title="交易详情" width="30%">
        <div v-if="selectedTransaction">
          <p><strong>交易 ID:</strong> {{ selectedTransaction.transactionId }}</p>
          <p><strong>商品名称:</strong> {{ selectedTransaction.productName }}</p>
          <p><strong>交易日期:</strong> {{ selectedTransaction.date }}</p>
          <p><strong>数量:</strong> {{ selectedTransaction.quantity }}</p>
          <p><strong>总金额:</strong> ¥{{ selectedTransaction.totalAmount }}</p>
          <p><strong>备注:</strong> {{ selectedTransaction.notes || '无' }}</p>
        </div>
  
        <!-- 使用 v-slot:footer -->
        <template v-slot:footer>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        transactionData: [
          {
            transactionId: 'T12345',
            productName: '商品A',
            date: '2024-09-10',
            quantity: 2,
            totalAmount: 200,
            notes: '快速发货'
          },
          {
            transactionId: 'T12346',
            productName: '商品B',
            date: '2024-09-11',
            quantity: 1,
            totalAmount: 150,
            notes: '包装完好'
          },
          {
            transactionId: 'T12347',
            productName: '商品C',
            date: '2024-09-12',
            quantity: 3,
            totalAmount: 450,
            notes: ''
          }
        ],
        dialogVisible: false,
        selectedTransaction: null
      };
    },
    methods: {
      viewDetails(transaction) {
        this.selectedTransaction = transaction;
        this.dialogVisible = true;
      }
    }
  };
  </script>
  
  <style scoped>
  .transaction-history {
    padding: 20px;
  }
  </style>
  