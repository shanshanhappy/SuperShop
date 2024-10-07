<template>
  <div class="purchase-product">
    <!-- 商品信息展示 -->
    <div class="product-info">
      <el-image
          :src="product.image"
          fit="cover"
          class="product-image"
      ></el-image>
      <div class="product-details">
        <h2>{{ product.name }}</h2>
        <p>价&nbsp;&nbsp;格: <strong class="price">¥{{ product.price }}</strong></p>
        <p>描&nbsp;&nbsp;述:  <strong>{{ product.description }}</strong></p>
      </div>
    </div>

    <!-- 购买按钮 -->
    <el-button type="primary" @click="onPurchase" class="purchase-btn">购买</el-button>

    <!-- 购买信息输入对话框 -->
    <el-dialog
        title="填写购买信息"
        v-model="purchaseDialogVisible"
        width="30%"
        class="purchase-dialog"
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

  <div class="product-page">
    <!-- 导航栏 -->
    <div class="nav">
      <button @click="scrollToSection('overview')">商品展示</button>
      <button @click="scrollToSection('details')">参数信息</button>
    </div>
    <hr>

    <!-- 商品展示部分 -->
    <section id="overview" class="section">
      <div class="product-images">
        <h2 class="section-title">商品展示</h2>
        <el-image
            :src="product.images"
            fit="cover"
            class="product-display-image"
            style="max-width: 40%; max-height: 600px; width: auto; height: auto;margin-top: 20px"
        ></el-image>
      </div>
    </section>

    <!-- 商品详情部分 -->
    <section id="details" class="section">
      <div class="product-information">
        <h2 class="section-title">参数信息</h2>
        <table class="product-details-table" style="margin-top: 20px">
          <thead>
          <tr>
            <th>属性</th>
            <th>详情</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>品牌</td>
            <td>{{ product.details.brand }}</td>
          </tr>
          <tr>
            <td>型号</td>
            <td>{{ product.details.model }}</td>
          </tr>
          <tr>
            <td>颜色</td>
            <td>{{ product.details.color }}</td>
          </tr>
          <tr>
            <td>尺寸</td>
            <td>{{ product.details.size }}</td>
          </tr>
          <tr>
            <td>价格</td>
            <td>{{ product.details.price }} 元</td>
          </tr>
          <tr>
            <td>描述</td>
            <td>{{ product.details.description }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>

  <div>
    <button v-if="isVisible" @click="scrollToTop" class="scroll-top-btn">回到顶部</button>
  </div>
  <div>
    <button @click="scrollToTop" class="scroll-top-btn">回到顶部</button>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
export default {
  data() {
    return {
      product: {
        image: 'https://th.bing.com/th/id/R.33f6c8fbba013a1f0e6152dc52b73c1b?rik=ZwUQ7gkx42ecLw&riu=http%3a%2f%2fimg.alicdn.com%2fimgextra%2fi4%2f2985248266%2fO1CN01elz76r2AvsQphdV5H_!!2985248266-0-daren.jpg&ehk=VqhyO9LO%2byoC80bfw7%2fjwDfO5TG0mRM7fDVO2jRw47k%3d&risl=&pid=ImgRaw&r=0',
        images: ['https://img.alicdn.com/imgextra/i4/2217113064277/O1CN01b0laEU1hSuxJJsUFR_!!2217113064277.jpg'],
        name: 'Kappa女鞋德训鞋',
        price: 359.9,
        description: '2024秋季新款运动休闲鞋女百搭低帮复古板鞋。',
        details: {
          brand: '品牌A',
          model: '型号B',
          color: '锡兰黄',
          size: '39',
          price: '399',
          description: 'Kappa女鞋德训鞋增高2024秋季新款运动休闲鞋女百搭低帮复古板鞋。',
        },
      },
      purchaseDialogVisible: false,
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
      this.purchaseDialogVisible = true;
    },
    submitPurchase() {
      this.$refs.purchaseForm.validate((valid) => {
        if (valid) {
          this.$message.success(`成功购买了 ${this.product.name}`);
          this.purchaseDialogVisible = false;
          this.resetForm();
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
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
};
</script>

<style scoped>
.purchase-product {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.product-page{
  max-width: 90%;
  margin: 0 auto;
}

.product-images{
  text-align: center;
}

.product-info {
  text-align: center;
}

.product-image {
  width: 100%;
  height: 250px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-details {
  margin-top: 15px;
}

.price {
  color: #e53935;
  font-size: 1.5em;
}

.purchase-btn {
  font-size: 1.2em;
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  background-color: #50c9c3;
  border: none;
}

.purchase-btn:hover {
  background-color: #4e73df;
}

.purchase-dialog {
  border-radius: 12px;
}

.nav {
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.scroll-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.section {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
}

.product-display-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-information {
  display: flex;
  flex-direction: column; /* 让标题和表格竖直排列 */
  align-items: center; /* 水平居中 */
  margin-bottom: 30px; /* 控制表格与底部的距离 */
}

.product-details-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-details-table th,
.product-details-table td {
  border: 1px solid #ccc;
  padding: 15px;
  text-align: left;
  background-color: #f9f9f9;
}

.product-details-table th {
  background-color: #e0e0e0;
}

</style>
