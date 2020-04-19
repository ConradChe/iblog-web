<template>
  <el-header>
    <el-row :gutter="20" class="head-box">
      <el-col :span="2" :offset="2">
        <router-link to="/" class="me-title">
          <img src="@/assets/image/logo.png" class="logo"/>
        </router-link>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="search-box">
          <span class="menu-active">首页</span>
          <span>文章管理</span>
          <span>写文章</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div style="margin-top: 20px">
          <el-input
            placeholder="搜索文章"
            v-model="input"
            suffix-icon="el-icon-search"
            @change="searchBlog">
          </el-input>
        </div>
      </el-col>
      <el-col :span="2" :offset="6">
        <div class="search-box">头像</div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .head-box{
    background-color: #ffff;
    border-bottom: 1px solid #e4e4e4;
    color: cornflowerblue;
  }
  .logo{
    width: 100px;
    height: 80px;
  }
  .search-box{
    margin-top: 30px;
  }
  .search-box span{
    margin-left: 30px;
  }

  .menu-active{
    font-size: 20px;
    color: #000094;
  }
</style>
