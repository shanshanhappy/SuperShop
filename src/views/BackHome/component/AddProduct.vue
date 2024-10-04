<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="add-product">
      <el-form
        ref="productForm"
        :model="product"
        :rules="rules"
        label-width="100px"
        class="product-form"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="product.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
  
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="product.price" :min="0" placeholder="请输入商品价格"></el-input-number>
        </el-form-item>
  
        <el-form-item label="商品描述" prop="description">
          <el-input
            type="textarea"
            v-model="product.description"
            placeholder="请输入商品描述"
          ></el-input>
        </el-form-item>
  
        <!-- 商品图片上传 -->
        <el-form-item label="商品图片" prop="image">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :file-list="product.imageList"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          name: '',
          price: null,
          description: '',
          imageList: []  // 存储上传的图片文件
        },
        rules: {
          name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
          price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
          description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
          imageList: [{ required: true, message: '请上传商品图片', trigger: 'change' }]
        }
      };
    },
    methods: {
      handleUploadSuccess(response, file) {
        this.product.imageList.push(file); // 将图片文件添加到 imageList 中
        this.$message.success('图片上传成功');
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
  
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit() {
        this.$refs.productForm.validate((valid) => {
          if (valid) {
            // 提交表单后的逻辑，比如保存到数据库
            this.$message.success('商品添加成功！');
          } else {
            this.$message.error('请完善商品信息！');
            return false;
          }
        });
      },
      onReset() {
        this.$refs.productForm.resetFields();
        this.product.imageList = [];
      }
    }
  };
  </script>
  
  <style scoped>
  .add-product {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .upload-demo {
    display: inline-block;
  }
  </style>