<template>
<el-main>
      <el-row  class="center">
         <el-col :span="20">
         <el-input
           placeholder="按用户名或昵称搜索">
           <el-button slot="append" icon="el-icon-search" circle></el-button>
         </el-input>
        </el-col>
        <el-button type="primary">新增用户</el-button>
      </el-row>
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
          <template slot-scope="scope">
           <el-button-group>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="onDelete(scope.row.userName)"></el-button>
           </el-button-group>
          </template>
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
  import qs from 'qs'

  export default {
    name: 'HomeMainView',
    data() {
      const item = {
        username: '',
        nickname: '',
        sex: '',
        sign: ''
      };
      return {
        tableData: Array(20).fill(item),
        userList: null,
      }
    },
    mounted () {
       this.getUserList()
    },
    methods: {
       getUserList() {
        request.get('/user/getUserList').then(res=>{
          this.userList = res;
        })
      },
      async onDelete(userName) {
        const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/user/delete',qs.stringify({
            username: userName
          }))
          .then(res=>{
            console.log(res)
            this.getUserList();
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
}
</script>
<style>
 .center {
    margin-top: 15px;
    margin-bottom: 30px;
  }
</style>
