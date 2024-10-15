<template>
  <div class="transaction-business">
    <!-- 进度条 -->
    <el-steps :active="currentStep" align-center class="el-steps">
      <el-step title="提交购买信息"></el-step>
      <el-step title="冻结商品"></el-step>
      <el-step title="确认出售"></el-step>
    </el-steps>

    <!-- 商品信息 -->
    <div class="product-info">
      <el-image
          :src="product.image"
          fit="cover"
          class="product-image"
      ></el-image>
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p>价&nbsp;&nbsp;格: <strong style="color: red">¥{{ product.price }}</strong></p>
        <p v-if="product.sold" style="color: green;"><strong>商品已售出</strong></p>
        <p v-else>库&nbsp;&nbsp;存: <strong>{{ product.stock }}</strong></p>
        <p>描&nbsp;&nbsp;述: <strong>{{ product.description }}</strong></p>
      </div>
    </div>

    <!-- 购买者列表（商品售出后不显示） -->
    <div class="buyer-list" v-if="!product.sold">
      <el-card
          v-for="buyer in buyers"
          :key="buyer.id"
          :class="{'frozen': buyer.frozen}"
          class="buyer-card"
          @click="selectBuyer(buyer)"
          shadow="hover"
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
    >
      <p>确认冻结商品 "{{ product.name }}" 给购买者 "{{ selectedBuyer?.name }}" 吗？</p>
      <template v-slot:footer>
        <el-button @click="freezeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmFreeze">确认</el-button>
      </template>
    </el-dialog>

    <!-- 解冻商品的对话框 -->
    <el-dialog
        title="解冻商品"
        v-model="unfreezeDialogVisible"
        width="30%"
    >
      <p>确认取消冻结商品 "{{ product.name }}" 给购买者 "{{ selectedBuyer?.name }}" 吗？</p>
      <template v-slot:footer>
        <el-button @click="unfreezeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUnfreeze">确认</el-button>
      </template>
    </el-dialog>

    <!-- 确认售出的对话框 -->
    <el-dialog
        title="确认售出"
        v-model="sellDialogVisible"
        width="30%"
    >
      <p>确认将商品 "{{ product.name }}" 售出给 "{{ selectedBuyer?.name }}" 吗？</p>
      <template v-slot:footer>
        <el-button @click="sellDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSell">确认</el-button>
      </template>
    </el-dialog>

    <!-- 步骤2的下一步按钮 -->
    <div v-if="currentStep === 2">
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </div>

    <!-- 取消交易按钮（步骤3显示） -->
    <div v-if="currentStep === 3" class="cancel">
      <el-button type="danger" @click="cancelTransaction">取消交易</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        image: 'https://th.bing.com/th/id/R.33f6c8fbba013a1f0e6152dc52b73c1b?rik=ZwUQ7gkx42ecLw&riu=http%3a%2f%2fimg.alicdn.com%2fimgextra%2fi4%2f2985248266%2fO1CN01elz76r2AvsQphdV5H_!!2985248266-0-daren.jpg&ehk=VqhyO9LO%2byoC80bfw7%2fjwDfO5TG0mRM7fDVO2jRw47k%3d&risl=&pid=ImgRaw&r=0',
        name: 'Kappa女鞋德训鞋',
        price: 359.9,
        stock: 1,
        description: '2024秋季新款运动休闲鞋女百搭低帮复古板鞋。',
        sold: false,  // 新增售出状态
      },
      currentStep: 1,  // 当前进度步骤
      buyers: [
        { id: 1, name: '买家1', contact: '1234567890', frozen: false },
        { id: 2, name: '买家2', contact: '1234567891', frozen: false },
        { id: 3, name: '买家3', contact: '1234567892', frozen: false },
        // { id: 4, name: '买家4', contact: '1234567893', frozen: false },
        // { id: 5, name: '买家5', contact: '1234567894', frozen: false },
        // { id: 6, name: '买家6', contact: '1234567895', frozen: false }
      ],
      freezeDialogVisible: false,
      unfreezeDialogVisible: false,
      sellDialogVisible: false,  // 售出确认框
      selectedBuyer: null
    };
  },
  methods: {
    selectBuyer(buyer) {
      if (buyer.frozen) {
        this.selectedBuyer = buyer;
        this.unfreezeDialogVisible = true;
      } else {
        this.selectedBuyer = buyer;
        this.freezeDialogVisible = true;
      }
    },
    confirmFreeze() {
      this.buyers.forEach(buyer => {
        buyer.frozen = false;
      });
      this.selectedBuyer.frozen = true;
      this.currentStep = 2;  // 进入步骤2
      this.freezeDialogVisible = false;
    },
    confirmUnfreeze() {
      this.selectedBuyer.frozen = false;
      this.currentStep = 1;  // 返回步骤1
      this.unfreezeDialogVisible = false;
    },
    nextStep() {
      if (this.currentStep === 2) {
        this.sellDialogVisible = true;  // 弹出确认售出框
      }
    },
    confirmSell() {
      this.product.sold = true;  // 标记为售出
      this.sellDialogVisible = false;
      this.currentStep = 3;  // 进入步骤3
    },
    cancelTransaction() {
      this.product.sold = false;  // 取消售出
      this.currentStep = 2;  // 返回步骤2
    }
  }
};
</script>

<style scoped lang="scss">
.transaction-business {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap; //适配小屏幕

  p {
    padding: 5px;
  }

  .buyer-list {
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .buyer-card {
    cursor: pointer;
    transition: all 0.3s;
    width: calc(33.33% - 15px);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;  // 底部间距适应多行卡片
  }
}

.product-info {
  margin-top: 20px;
  width: 60%;
  text-align: center;  // 文字居中
  border-right: 1px solid #ebeef5;
  padding-right: 20px;
}

.product-image {
  width: 100%;
  height: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  // 阴影效果
  margin-bottom: 10px;
}
.product-details {
  /*margin: 10px 0;*/
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin: 10px 0;
  }

  .price {
    color: #ff4949;
    font-weight: bold;
  }
}

.buyer-list {
  width: 60%;
  display: flex;
  flex-wrap: wrap; // 支持多行
  justify-content: center; // 水平居中
  margin-top: 10px;
  gap: 15px;

  .buyer-card {
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 卡片阴影
    width: calc(33.33% - 15px); // 控制卡片宽度以适应列数并留出间隔
    margin-bottom: 15px; // 添加底部间距以适应多行卡片

    //.frozen {
    //  background-color: #ffeb3b;
    //}
    &.frozen {
      background-color: #ffeb3b; /* 冻结状态颜色 */
      color: #333;
      font-weight: bold;
    }

    &.frozen:hover{
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      background-color:  #ffeb3b;
    }

    /* 悬浮时颜色效果，只在未冻结状态时生效 */
    &:not(.frozen):hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      background-color: #f5f7fa;
    }

  }
}

.el-steps {
  margin-bottom: 20px;
  width: 60%;
}
.cancel{
  margin-top: 10px;
}
</style>
