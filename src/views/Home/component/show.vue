<!-- eslint-disable vue/multi-word-component-names -->
<script>
/*
一.商品展示模块，这里需要获得商品数据的api，get请求
所需要的参数是：
0.商品idgoodsId：Long;
1.在购买模块中的商品图片image1：url
2.商品名称name：string
3.商品价格price：number
4.商品描述description：string
在商品详情模块中
5.商品展示图片image2：url
6.商品详情details：{
  brand:string
  model:string
  color:string
  size:string
  price:number
  description:string
}
二.进行前后端接口交互
1.第一步为了避免跨域问题我们要在vite.config.json对于api根域进行封装
如下：
 server:
  {
    proxy: {

      '/api': {
        target: 'http://localhost:8080/SuperShop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
      },
  }},
  2.第二步：封装api,在utils文件夹下创建一个文件http3.js，使用axios进行基础封装
  2.1
  如下：
    import axios from "axios";
    import { ElMessage } from 'element-plus'//这个用于请求失败时的错误情况弹出
    const  httpInstance = axios.create({
    baseURL: '/apis',
 
    timeout: 5000
    })
  2.2 
  如下：
    // axios请求拦截器
      httpInstance.interceptors.request.use(config => {
      return config
      }, e => Promise.reject(e))
  2.2响应式拦截与捕捉错误信息
  如下：
    // axios响应式拦截器
      httpInstance.interceptors.response.use(res => res.data, e => {
   /// 确保 e.response 和 e.response.data 存在
      const message = e.response?.data?.message || '请求出错，请稍后再试';
   // 统一错误提示
     ElMessage({
     type: 'warning',
     message: message
   });
     return Promise.reject(e)
   })
    export default httpInstance //一定要记得导出
 3.请求接口获取对象数据
 3.1请在api文件夹下创建一个文件Goods.js，进行接口的进一步封装
 3.2具体内容如下：
   export const  getGoodsAPI = () => {
    return httpInstance({
      url:'/goods/list'
    })
  }//httpInstance这个是之前封装根域导出的内容记得引入
  3.3在组件中引入接口请求获取数据
  如下：
  import { ref, onMounted } from 'vue'
  import { getGoodsAPI } from '@/apis/goods';
  //获取数据列表
  const goodProduct = ref([])
  const getGoods = async () => {
  const res = await getGoodsAPI()
  goodProduct.value = res.result  //依据后端返回的数据属性值来看
  }
  onMounted(()=>getGoods())//V中的一个生命周期钩子
  接下来你就可以调用goodProduct来获取数据了
  例如 <image src="{{goodProduct.image1}}"/>
三.当客户具有购买商品，填写购买信息点击购买按钮时，需要调用后端接口将购买者相关信息存储在Customers数据库中的buyers表中
所需参数：
        
        name: String,
        phone: String,
        wechat: String,
        goodsId: Long,
四.利用接口进行交互
上面1-2步骤做过一次之后就不需要做了，因为接口的根域是相同的，现在直接开始第三部
3.在apis文件下创建一个文件Costumes.js，进行接口的进一步封装(以后所有关于Costumer的接口都封装在这里)
  export const postbuyersAPI = (buyerInfo, goodsId) => {
  return httpInstance({
    url: '/goods/buy',
    method: 'POST',
    data: {
      ...buyerInfo, // 这里展开 buyerInfo 对象
      goods: {
        goodsId, // 直接使用传入的 goodsId
      },
    },
4.使用接口进行业务处理
  methods: {
    onPurchase() {
      this.purchaseDialogVisible = true;
    },
    submitPurchase() {
      this.$refs.purchaseForm.validate((valid) => {
        if (valid) {
          postbuyersAPI(this.buyerInfo, this.goodsproduct.goodsId).then(response => {//这里使用了api接口，请看表单绑定的数据对象为：buyerInfo
            this.$message.success(`成功购买了 ${this.product.name}`);
            this.purchaseDialogVisible = false;
            this.resetForm();
          }).catch(error => {
            this.$message.error('购买失败，请重试！');
          });
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
  },
*/
import { getGoodsAPI } from '@/apis/goods';
import { ref, onMounted,watch } from 'vue'
//获取数据列表
const goodProduct = ref({})
const getGoods = async () => {
  try {
    const res = await getGoodsAPI();
    console.log("API response:", res); // 输出响应数据
    goodProduct.value = res;
  } catch (error) {
    console.error('Error fetching goods:', error);
  }
};

onMounted(async () => {
  await getGoods();
  console.log(goodProduct); // 检查数据内容
});
watch(() => goodProduct.value, (newVal) => {
  console.log("goodProduct updated:", newVal);
});

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
        <p v-if="goodProduct && goodProduct.name">描&nbsp;&nbsp;述:  <strong>{{ goodProduct.name}}</strong></p>
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
