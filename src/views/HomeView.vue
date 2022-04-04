<template>
<el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router>
      <el-submenu index="/">
        <template slot="title"><i class="el-icon-message"></i>主要功能</template>
        <el-menu-item-group>
          <el-menu-item index="/">用户管理</el-menu-item>
          <el-menu-item index="/2">新闻管理</el-menu-item>
          <el-menu-item index="1-1">评论管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" round>登录</el-button>
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
  }
</style>

<script>
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
        userList: null
      }
    },
  };
</script>
