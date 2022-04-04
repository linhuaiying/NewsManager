<template>
<el-main>
      <el-table :data="userList">
        <el-table-column prop="userName" label="用户名" width="200">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="200">
        </el-table-column>
        <el-table-column prop="sign" label="签名" width="200">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-delete" size="small"></el-button>
        </el-table-column>
      </el-table>
      <el-button-group style="marginTop: 20px">
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
</el-main>
</template>

<script>
  import request from '@/utils/request.js'
  
  export default {
    name: 'index',
    data() {
      const item = {
        username: '',
        nickname: '',
        sex: '',
        sign: ''
      };
      return {
        tableData: Array(20).fill(item),
        userList: null
      }
    },
    mounted () {
       request.get('/user/getUserList').then(res=>{
          this.userList = res;
       })
    }
  };
</script>
