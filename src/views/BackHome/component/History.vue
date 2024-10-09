<!-- eslint-disable vue/multi-word-component-names -->
<script>
/*
一.查看交易历史也需要用到接口
1.
export const getTransactionHistoryAPI = () => {
  return httpInstance({
    url: '/transactions/history', // 假设这是获取交易历史的接口 URL
    method: 'GET',
  });
};










*/
export default {
  data() {
    return {
      transactionData: [
        {
          transactionId: 'T12345',
          productName: '商品A',
          date: '2024-09-10',
          quantity: 2,
          totalAmount: 719.8,
          notes: '快速发货'
        },
        {
          transactionId: 'T12346',
          productName: '商品B',
          date: '2024-09-11',
          quantity: 1,
          totalAmount: 359.9,
          notes: '包装完好'
        },
        {
          transactionId: 'T12347',
          productName: '商品C',
          date: '2024-09-12',
          quantity: 3,
          totalAmount: 1079.7,
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
    },
    handleClose() {
      this.selectedTransaction = null;
    }
  }
};
</script>
<template>
    <div class="transaction-history-container">
      <el-table :data="transactionData" stripe style="width: 100%" class="el-table" height="500">
        <el-table-column prop="transactionId" label="交易 ID" width="150" />
        <el-table-column prop="productName" label="商品名称" width="200" />
        <el-table-column prop="date" label="交易日期" width="180" />
        <el-table-column prop="quantity" label="数量" width="100" />
        <el-table-column prop="totalAmount" label="总金额" width="150" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetails(scope.row)" class="view-button">
              <i class="el-icon-view"></i>查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 交易详情对话框 -->
      <el-dialog v-model="dialogVisible" title="交易详情" width="50%"  :before-close="handleClose"
                 class="transaction-dialog">
        <div v-if="selectedTransaction">
          <p><strong>交易 ID:</strong> {{ selectedTransaction.transactionId }}</p>
          <p><strong>商品名称:</strong> {{ selectedTransaction.productName }}</p>
          <p><strong>交易日期:</strong> {{ selectedTransaction.date }}</p>
          <p><strong>数量:</strong> {{ selectedTransaction.quantity }}</p>
          <p><strong>总金额:</strong> ¥{{ selectedTransaction.totalAmount }}</p>
          <p><strong>备注:</strong> {{ selectedTransaction.notes || '无' }}</p>
        </div>

          <template #footer >
          <el-button @click="dialogVisible = false" class="el-button">关闭</el-button>
          </template>
      </el-dialog>
    </div>
  </template>
  
  
  
  <style scoped>
  .transaction-history-container {
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .transaction-dialog {
    background-color: #fff !important;
    border-radius: 10px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }


  .dialog-footer {
    text-align: right;
    padding: 10px 0;
    background-color: #f5f7fa;
  }

  .el-table {
    border: none;
    font-size: 14px;
  }

  .el-table th,
  .el-table td {
    text-align: left;
    padding: 12px 20px;
  }

  .el-button {
    border-radius: 6px;
    transition: background-color 0.3s, transform 0.2s;
  }

  .el-button:hover {
    background-color: #409eff;
    transform: scale(1.05);
  }.close-button {
     color: #f56c6c;
     border-color: #f56c6c;
   }

  .close-button:hover {
    background-color: #fde2e2;
  }
  </style>
  