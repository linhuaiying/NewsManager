<template>
<el-main>
      <el-col :span="24" class="center">
         <el-input
           placeholder="按新闻ID搜索">
           <el-button slot="append" icon="el-icon-search" circle></el-button>
         </el-input>
      </el-col>
      <el-table :data="commentList">
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
    name: 'CommentsMainView',
    data() {
      return {
        commentList: null
      }
    },
    mounted () {
      this.getCommentList()
    },
    methods: {
      getCommentList() {
        request.get('comment/getAllComments').then(res=>{
          this.commentList = res;
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
         request.post('/comment/delete',qs.stringify({
           id
       }))
         .then(res=>{
           console.log(res)
           this.getCommentList()
         })
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

