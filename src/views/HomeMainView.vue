<template>
<el-main>
      <el-row  class="center">
        <el-col :span="9">
         <el-input
           placeholder="按用户名搜索"
           v-model="userName">
           <el-button slot="append" icon="el-icon-search" circle @click="onSelectUserName"></el-button>
         </el-input>
        </el-col>
        <el-col :span="9" class="right">
         <el-input
           placeholder="按昵称搜索"
           v-model="nickName">
           <el-button slot="append" icon="el-icon-search" circle @click="onSelectNickName"></el-button>
         </el-input>
        </el-col>
        <el-button type="primary" @click="$router.push('/user/addUser')">新增用户</el-button>
      </el-row>
      <el-table :data="currentList">
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
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="totalsize"
      style="marginTop: 20px">
    </el-pagination>
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
        userName: '',
        nickName: '',
        currentPage: 1,
        totalsize: 0,
        currentList: null,
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        vm.getUserList() //vm等于this
      });   
    },
    mounted () {
       this.getUserList()
    },
    methods: {
       getUserList() {
        request.get('/user/getUserList').then(res=>{
          this.userList = res;
          this.currentList = this.userList.slice(0, 5);
          this.totalsize = this.userList.length;
        })
      },
      async onDelete(userName) {
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
      },
       onSelectUserName() {
        if(this.userName === null || this.userName === '') {
          this.getUserList();
          return;
        }
        request.post('/user/getUsersListByUserName', qs.stringify({
            username: this.userName
          }))
         .then(res=>{
           console.log(res)
           this.userList = res;
         })
      },
      onSelectNickName() {
        if(this.nickName === null || this.nickName === '') {
          this.getUserList();
          return;
        }
        request.post('/user/getUsersListByNickName', qs.stringify({
            keyWords: this.nickName
        }))
         .then(res=>{
           console.log(res)
           this.userList = res;
         })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentList = this.userList.slice((val - 1)*5, (val - 1)*5 + 5);
      }
    }
}
</script>
<style>
 .center {
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .center {
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .right {
    margin-left: 20px;
  }
</style>
