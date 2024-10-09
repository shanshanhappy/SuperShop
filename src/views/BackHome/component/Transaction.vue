<!-- eslint-disable vue/multi-word-component-names -->
<script>
/*
其实可以使用pinia来管理商品数据，这样只用放送一次商品的数据请求，但是项目刚开始，所以就先不进行优化了
假设product是使用api获取得到的数据

一.在显示购买方的时间需要接口获取买方列表
1.接口封装
export const getbuyersAPI = () => {
  return httpInstance({
    url: '/goods/buy', // 假设这个 URL 返回所有购买者的列表
    method: 'GET',
  });
};
2.利用接口获取的列表数据
  import { ref, onMounted } from 'vue';
  import { getbuyersAPI } from '@/apis/buyers'; // 请替换为实际的 API 文件路径

  // 获取购买者列表
  const buyers = ref([]);

  const getBuyers = async () => {
    try {
      const res = await getbuyersAPI();
      buyers.value = res.data; // 根据后端返回的数据属性值
    } catch (error) {
      console.error('获取购买者列表失败:', error);
    }
  };

  onMounted(() => getBuyers()); // 在组件挂载时调用获取购买者列表
3.将获取的数据用于渲染
<div class="buyer-list">
    <el-card v-for="buyer in buyers" :key="buyer.id" class="buyer-card" @click="selectBuyer(buyer)" >
      <p>购买者: {{ buyer.name }}</p>
      <p>联系电话: {{ buyer.contact }}</p>
      <p>联系微信: {{ buyer.contact }}</p>
    </el-card>
  </div>
二.这里有一个冻结商品的业务，当商品库存stock为0时，
商品将不允许购买者购买，并将商品信息从数据库的删除
而且还可以将交易者的信息上传到Costumes数据库中trader表中。
1.接口封装
export const freezeProductAPI = (productId, traderId，Nowtime) => {//这里traderId是buyerId
  return httpInstance({
    url: '/goods/freeze', // 假设这个 URL 是冻结商品的接口
    method: 'POST',
    data: {
      productId,
      traderId,
      Nowtime
    },
  });
};
2.调用接口
  methods: {
    selectBuyer(buyer) {
      this.selectedBuyer = buyer;
      this.freezeDialogVisible = true;
    },
    confirmFreeze() {
      // 调用冻结商品接口
      freezeProductAPI(this.product.id, this.selectedBuyer.id)
        .then(response => {
          this.$message.success(`商品已冻结给购买者 ${this.selectedBuyer.name}`);
          this.freezeDialogVisible = false;
        })
        .catch(error => {
          this.$message.error('冻结商品失败: ' + error.message);
        });
    }
  }
};
  
*/
  export default {
    data() {
      return {
        product: {
          image: 'https://th.bing.com/th/id/R.33f6c8fbba013a1f0e6152dc52b73c1b?rik=ZwUQ7gkx42ecLw&riu=http%3a%2f%2fimg.alicdn.com%2fimgextra%2fi4%2f2985248266%2fO1CN01elz76r2AvsQphdV5H_!!2985248266-0-daren.jpg&ehk=VqhyO9LO%2byoC80bfw7%2fjwDfO5TG0mRM7fDVO2jRw47k%3d&risl=&pid=ImgRaw&r=0', // 示例图片地址
          name: 'Kappa女鞋德训鞋',
          price: 359.9,
          stock: 1,
          description: '2024秋季新款运动休闲鞋女百搭低帮复古板鞋。'
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
<template>
    <div class="transaction-business">
    
      <div class="product-info">
        <el-image
          :src="product.image"
          fit="cover"
          style="width: 100%; height: 200px;"
          class="product-image"
        ></el-image>
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p>价&nbsp;&nbsp;格: <strong style="color: red">¥{{ product.price }}</strong></p>
          <p>库&nbsp;&nbsp;存: <strong>{{ product.stock }}</strong></p>
          <p>描&nbsp;&nbsp;述: <strong>{{ product.description }}</strong></p>
        </div>
      </div>
  
     
      <div class="buyer-list">
        <el-card
          v-for="buyer in buyers"
          :key="buyer.id"
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
  
  
  
  <style scoped lang="scss">
  .transaction-business {
    display: flex;
    //让所有的卡片都居中显示
    justify-content: center;
    gap: 20px;
    padding: 20px;
    flex-wrap: wrap;//适配小屏幕

    p{
      padding: 5px;
    }
  .product-info {
    width: 40%;
    border-right: 1px solid #ebeef5;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .product-image {
      width: 100%;
      height: 250px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 阴影效果
      margin-bottom: 20px;
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
  }
  .buyer-list {
    width: 60%;
    display: flex;
    flex-wrap: wrap; // 支持多行
    justify-content: center; // 水平居中
    /*grid-template-columns: 1fr 1fr;
    gap: 10px;*/
    gap: 15px;

    .buyer-card {
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 卡片阴影
      width: calc(33.33% - 15px); // 控制卡片宽度以适应列数并留出间隔
      margin-bottom: 15px; // 添加底部间距以适应多行卡片

      &:hover {
        transform: scale(1.05); // 悬停放大效果
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); // 悬停阴影
        background-color: #f5f7fa; // 悬停背景色
      }

      p {
        margin: 0;
        color: #606266;
        font-size: 14px;
      }
    }
  }

    @media (max-width: 768px) {
      flex-direction: column; // 小屏幕下垂直排列
      .product-info, .buyer-list {
        width: 100%;
      }
      .buyer-card {
        width: calc(50% - 15px); // 在小屏幕上每行显示2个卡片
      }
    }

    @media (max-width: 480px) {
      .buyer-card {
        width: 100%; // 在超小屏幕上每行显示1个卡片
      }
    }
  }
  
/*  .buyer-card:hover {
    background-color: #f5f7fa;
  }*/
  </style>
  