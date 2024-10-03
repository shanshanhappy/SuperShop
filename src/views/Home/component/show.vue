<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref,onMounted, onBeforeUnmount,defineComponent } from 'vue';
// const selectedOption = ref(product.value.options[0])
const product = ref({
  images: [
    'https://img.alicdn.com/imgextra/i4/2217113064277/O1CN01b0laEU1hSuxJJsUFR_!!2217113064277.jpg',
  ],
  title: "Kappa女鞋德训鞋增高2024秋季新款运动休闲鞋女百搭低帮复古板鞋",
  price: 399.99,
  address:"浙江杭州",
  send: "免运费 15:30前付款，预计10月7日送达",
  des:"假一赔四，极速交易",
  options:"锡兰黄",
  size:"38",
  details: {
    brand: '品牌A',
    model: '型号B',
    color: '锡兰黄',
    size: '39',
    price: '399',
    description: '这是商品的详细描述信息，包含产品特性和规格等。',
  },
});

const addToCart = () => {
  alert("已提交购买申请!");
};
const selectOption = () => {
  alert("确定颜色");
};
const selectSize = () =>{
  alert("确定鞋码");
}
// 滚动到指定部分
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// 监听滚动事件
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log('当前滚动位置:', scrollTop);
  // 你可以根据 scrollTop 来动态更新界面，比如改变导航栏样式、显示特定内容等
};

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
// 直接在 script 中定义组件逻辑
const isVisible = ref(false); // 控制按钮的显示状态

// 处理滚动事件
const handleScroll1 = () => {
  isVisible.value = window.scrollY > 200; // 当滚动超过200px时显示按钮
};

// 滚动到顶部的函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// 组件挂载时添加滚动事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll1);
});

// 组件卸载时移除滚动事件监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll1);
});
</script>

<template>
<div class="goods-hot">
  <div class="product-image">
    <img src="./img.png" alt="Product Image" />
  </div>
  <div class="product-info" >
    <h1>{{ product.title }}</h1>
    <p class="price">￥{{ product.price }}</p>
    <p class="address">地&nbsp;&nbsp;址：{{ product.address }}</p>
    <p class="send">快&nbsp;&nbsp;递：{{ product.send }}</p>
    <p class="description">说&nbsp;&nbsp;明：{{ product.des }}</p>
    <div class="option-buttons" title="锡兰黄" >
      <p class="color">颜&nbsp;&nbsp;色：
        <button @click="selectOption()">
          {{ product.options }}
        </button>
      </p>
    </div>
    <div class="size-buttons" title="38" >
      <p class="color">鞋&nbsp;&nbsp;码：
        <button @click="selectSize()">
          {{ product.size }}
        </button>
      </p>
    </div>
<!--    <p class="color">颜&nbsp;&nbsp;色：<label style="width: 20px;border: 2px solid #ffc107">{{ product.color }}</label></p>-->
<!--    <p class="size">鞋&nbsp;&nbsp;码：<label style="width: 20px;border: 2px solid #c0c4cc">{{ product.size }}</label></p>-->
    <button @click="addToCart">立即购买</button>
  </div>
</div>
  <div class="product-page">
    <!-- 导航栏 -->
    <div class="nav">
      <button @click="scrollToSection('overview')">商品展示</button>
      <button @click="scrollToSection('details')">参数信息</button>
<!--      <button @click="scrollToSection('reviews')">用户评价</button>-->
    </div>
    <hr>

    <!-- 商品展示部分 -->
    <section id="overview" class="section">
<!--      <h1 class="section-title">商品展示</h1>-->
      <div class="product-images">
        <h1 class="section-title">商品展示</h1>
        <img v-for="image in product.images" :src="image" :key="image" alt="Product Image" />
      </div>
    </section>

    <!-- 商品详情部分 -->
    <section id="details" class="section">
      <div class="product-information">
        <h2 class="section-title">参数信息</h2>
        <table class="product-details">
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
</template>

<style scoped lang="scss">
.goods-hot {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.product-image img {
  max-width: 300px;
}

.section-title {
  font-size: 30px;
  margin: 0;
  padding: 0;
  margin-top: 40px;
  margin-bottom: 40px; /* 调整标题下方的间距 */
  text-align: center; /* 如果需要，可以让标题居中 */
}

/* 图片容器样式 */
.product-images {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 图片居中对齐 */
}

/* 图片样式 */
.product-images img {
  display: block; /* 确保图片是块级元素，避免与其他内容错位 */
  height: auto; /* 保持图片的宽高比 */
  padding: 0;
  margin-bottom: 40px;
}

.product-information{
  display: flex;
  flex-direction: column;
  justify-content: center; /* 图片居中对齐 */
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
p{
  padding: 4px;
}
.price {
  font-size: 24px;
  color: #f40;
}
.option-buttons button {
  margin-right: 10px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s; /* 动画效果 */
}

/* 悬停变色效果 */
.option-buttons button:hover {
  background-color: #ffb302; /* 鼠标悬停时的背景色 */
  color: white;             /* 改变文字颜色 */
  border-color: #ff6a00;    /* 改变边框颜色 */
}

.option-buttons button.active {
  border-color: #ff4500;
  background-color: #ffb302;
  color: white;
}

.size-buttons button {
  margin-right: 10px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s; /* 动画效果 */
}

/* 悬停变色效果 */
.size-buttons button:hover {
  background-color: #ffb302; /* 鼠标悬停时的背景色 */
  color: white;             /* 改变文字颜色 */
  border-color: #ff6a00;    /* 改变边框颜色 */
}
/* 选中的鞋码选项样式 */
.size-buttons button.active {
  border-color: #ffb302;
  background-color: #ffb302;
  color: white;
}

button {
  padding: 10px 70px;
  background-color: #cdcdcd;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ff4500;
}

.nav{
  display: flex;
  gap: 20px;
  padding: 20px;
}

/*.section{
  display: flex;
  margin-left: 20px;
}*/
hr{
  border: 0;
  height: 2px; /* 设置线条的高度 */
  background: #c0c4cc; /* 设置线条的颜色 */
  margin: 20px; /* 设置外边距 */
}
/* 商品详细信息表格样式 */
.product-details {
  width: 100%;
  border-collapse: collapse; /* 合并边框 */
  margin: 40px 0; /* 表格上下边距 */
}

.product-details th,
.product-details td {
  border: 1px solid #ccc; /* 边框颜色 */
  padding: 30px; /* 内边距 */
  text-align: left; /* 左对齐 */
}

.product-details th {
  background-color: #f2f2f2; /* 表头背景颜色 */
}
.product-page {
  padding: 30px;
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

.content {
  height: 2000px; /* 使内容足够长以便需要滚动 */
}
</style>