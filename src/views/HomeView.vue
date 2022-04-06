<template>
<el-container style="height: 100%">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router>
      <el-submenu index="/">
        <template slot="title"><i class="el-icon-user"></i>主要功能</template>
        <el-menu-item-group>
          <el-menu-item index="/home">用户管理</el-menu-item>
          <el-menu-item index="/news">新闻管理</el-menu-item>
          <el-menu-item index="/comments">评论管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-button round @click="onLoginOut">退出登录</el-button>
    </el-header>
   
    <el-main>
     <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #fff;
    height: 100%;
  }
</style>

<script>
import router from '@/router';
  export default {
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
    methods: {
      onLoginOut() {
        router.push("/login");
      }
    }
  };
</script>
