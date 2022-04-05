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
        <el-button type="primary">新增新闻</el-button>
      </el-row>
    <el-table :data="newsList" style="width: 100%">
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
    name: 'NewsMainView',
    data() {
      return {
        id: -1,
        newsList: null,
        title: null,
        userName: null,
      }
    },
    mounted () {
      this.getNewsList()
    },
    methods: {
      getNewsList() {
        request.get('/news/getNewsList').then(res=>{
          this.newsList = res;
        })
      },
     async onDelete(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
         request.post('/news/deleteNews',qs.stringify({
           newsId: id
       }))
         .then(res=>{
           console.log(res)
           this.getNewsList();
         })
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
         })
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

