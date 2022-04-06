<template>
<el-main>
      <el-col :span="24" class="center">
         <el-input
           placeholder="按新闻ID搜索"
           v-model="newsId">
           <el-button slot="append" icon="el-icon-search" circle @click="onSelectNewsId"></el-button>
         </el-input>
      </el-col>
      <el-table :data="currentList">
        <el-table-column prop="newsId" label="新闻ID">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="200">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="200">
        </el-table-column>
        <el-table-column prop="content" label="评论内容" width="200">
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
    name: 'CommentsMainView',
    data() {
      return {
        commentList: null,
        newsId: '',
        currentPage: 1,
        totalsize: 0,
        currentList: null,
      }
    },
    mounted () {
      this.getCommentList()
    },
    methods: {
      getCommentList() {
        request.get('comment/getAllComments').then(res=>{
          this.commentList = res;
          this.currentList = this.commentList.slice(0, 5);
          this.totalsize = this.commentList.length;
        })
      },
      async onDelete(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/comment/delete',qs.stringify({
             id
          }))
          .then(res=>{
             console.log(res)
             this.getCommentList()
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
      onSelectNewsId() {
         if(this.newsId === null || this.newsId === '') {
          this.getCommentList();
          return;
        }
        request.post('/comment/getComments', qs.stringify({
            newsId: this.newsId
          }))
         .then(res=>{
           console.log(res)
           this.commentList = res;
           this.currentList = this.commentList.slice(0, 5);
           this.totalsize = this.commentList.length;
         })
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentList = this.commentList.slice((val - 1)*5, (val - 1)*5 + 5);
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

