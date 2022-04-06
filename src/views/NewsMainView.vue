<template>
<el-main>
   <el-row  class="center">
         <el-col :span="9">
         <el-input
           placeholder="按新闻标题搜索"
           v-model="title">
           <el-button slot="append" icon="el-icon-search" circle @click="onSelectTitle"></el-button>
         </el-input>
        </el-col>
        <el-col :span="9" class="right">
         <el-input
           placeholder="按用户名搜索"
           v-model="userName">
           <el-button slot="append" icon="el-icon-search" circle @click="onSelectUserName"></el-button>
         </el-input>
        </el-col>
        <el-button type="primary" @click="$router.push('/news/addNews')">新增新闻</el-button>
      </el-row>
    <el-table :data="currentList" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="新闻内容">
            <br><span v-if="!props.row.newsContent">内容为空</span>
            <span v-html="props.row.newsContent" style="width: 60%; display: inline-block;"></span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="新闻ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="userName">
    </el-table-column>
    <el-table-column
      label="昵称"
      prop="nickName">
    </el-table-column>
    <el-table-column
      label="新闻标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="新闻内容(打开查看)"
      prop="">
    </el-table-column>
    <el-table-column
      label="发布日期"
      prop="date">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
      <el-button-group>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="onDelete(scope.row.id)"></el-button>
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
    name: 'NewsMainView',
    data() {
      return {
        id: -1,
        newsList: null,
        title: null,
        userName: null,
        currentPage: 1,
        totalsize: 0,
        currentList: null,
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        vm.getNewsList() //vm等于this
      });   
    },
    mounted () {
      this.getNewsList()
    },
    methods: {
      getNewsList() {
        request.get('/news/getNewsList').then(res=>{
          this.newsList = res;
          this.currentList = this.newsList.slice(0, 5);
          this.totalsize = this.newsList.length;
        })
      },
      onDelete(id) {
        this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/news/deleteNews',qs.stringify({
              newsId: id
          }))
          .then(res=>{
            console.log(res)
            this.getNewsList();
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
      onSelectTitle() {
        if(this.title === null || this.title === '') {
          this.getNewsList();
          return;
        }
        request.get('/news/getSearchNewsList', {
          params: {
            keywords: this.title
          }
        })
         .then(res=>{
           console.log(res)
           this.newsList = res;
           this.currentList = this.newsList.slice(0, 5);
           this.totalsize = this.newsList.length;
         })
      },
      onSelectUserName() {
        if(this.userName === null || this.userName === '') {
          this.getNewsList();
          return;
        }
        request.get('/news/getMyNewsList', {
          params: {
            username: this.userName
          }
        })
         .then(res=>{
           console.log(res)
           this.newsList = res;
           this.currentList = this.newsList.slice(0, 5);
           this.totalsize = this.newsList.length;
         })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentList = this.newsList.slice((val - 1)*5, (val - 1)*5 + 5);
      }
   }
  };
</script>
<style>
  .el-form-item__label {
    font-size: 100;
    font-weight: 600;
  }
 .center {
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .right {
    margin-left: 20px;
  }
</style>

