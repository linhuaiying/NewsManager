<template>
<el-col :span="10" class="addUser">
 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="large">
  <el-form-item label="用户名" prop="userName">
    <el-input v-model.number="ruleForm.userName"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="nickName">
    <el-input v-model="ruleForm.nickName"></el-input>
  </el-form-item>
  <el-form-item label="签名" prop="sign">
    <el-input v-model="ruleForm.sign"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex">
    <el-input v-model="ruleForm.sex"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
      name: "AddUserView",
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          userName: '',
          nickName: '',
          sign: '',
          sex: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
            request.post('/user/save',qs.stringify({
            username: this.ruleForm.userName,
            password: this.ruleForm.pass
           }))
           .then(res=>{
             console.log(res)
             alert('添加成功！');
           });
           request.post('/user/update',qs.stringify({
            username: this.ruleForm.userName,
            nickname: this.ruleForm.nickName,
            sex: this.ruleForm.sex,
            sign: this.ruleForm.sign,
            userIcon: ''
          }))
          .then(res=>{
            console.log(res)
            router.push('/home')
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
 .addUser {
     margin-left: 25%
 }
</style>