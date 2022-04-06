<template>
 <div class="wapper">
 <div style="margin: 200px auoto; background-color:#fff; width: 450px; height: 400px; padding: 20px; border-radius: 10px">
    <div class="title"><b>今日资讯后台管理系统</b></div>
    <el-row>
    <el-col :span="20" class="form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" size="large">
      <el-form-item label="用户名" prop="userName">
       <el-input v-model.number="ruleForm.userName"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
 </el-form>
</el-col>
</el-row>
<span class="s">账号:admin 密码:123456</span>
</div>
</div>
</template>
<script>
  import router from '../router'

  export default {
      name: "LoginView",
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        if(value !== 'admin') {
          return callback(new Error('用户名错误'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== '123456') {
          callback(new Error('密码错误'));
        } else {
          callback();
        }
      };
      return {
        url: 'https://uploadfile.bizhizu.cn/2014/0702/20140702103804944.jpg',
        ruleForm: {
          pass: '',
          userName: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName: [
            { validator: checkUsername, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          alert("登录成功!")
          router.push('/home')
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
   .wapper {
       background-image: url("../assets/background.jpg");
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100%;
       background-size: auto;
   }

    .title {
      margin: 10px auto 30px auto;
      text-align: center;
      color: #707070;
      font-size: 20px;
  }
   .form {
       margin-top: 40px;
   }
   .s {
       display: block;
       margin-top: 50px;
   }
</style>