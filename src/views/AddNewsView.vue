<template>
<el-col :span="20" class="center">
 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="large">
  <el-form-item label="标题" prop="title">
    <el-input v-model.number="ruleForm.title"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <el-input type="textarea" v-model="ruleForm.content" rows="20"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
 </el-form>
</el-col>
</template>

<script>
  import request from '@/utils/request.js'
  import qs from 'qs'
  import router from '../router'

  export default {
      name: "AddNewsView",
    data() {
      var checkTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('标题不能为空'));
        }
        callback();
      };
      return {
        ruleForm: {
           title: '',
           content: ''
        },
        rules: {
          title: [
            { validator: checkTitle, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post('/news/sendNewsContent',qs.stringify({
             title: this.ruleForm.title,
             newscontent: this.ruleForm.content,
             username: 'admin'
           }))
           .then(res=>{
             console.log(res)
             if(res === 'success') {
                 alert('发布成功！');
                 router.push('/news')
             }
           });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
 .center {
     margin-left: 0px;
 }
</style>