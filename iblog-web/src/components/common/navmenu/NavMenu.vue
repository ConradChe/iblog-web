<template>
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="2" :offset="2" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="@/assets/image/logo.png"/>
        </router-link>
      </el-col>
      <el-col :span="16" :offset="0">
        <el-menu router :default-active="activeIndex" mode="horizontal"
                 active-text-color="#5FB878">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/myfollow">我的关注</el-menu-item>
          <el-menu-item index="/blogmanage">文章管理</el-menu-item>
          <el-col :span="2" :offset="1">
            <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="me-title">
              <el-input
                placeholder="搜索文章"
                v-model="input"
                suffix-icon="el-icon-search"
                @change="searchBlog">
              </el-input>
            </div>
          </el-col>
        </el-menu>
      </el-col>

      <el-col :span="4" :offset="0">
        <el-menu router menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
          <template>
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  export default {
    name: "NavMenu",
    props: {
      activeIndex: {
        type:String,
        default() {
          return ""
        }
      }
    },
    data() {
      return {
        input:''
      }
    },
    methods: {
      searchBlog(){
        console.log(this.input);
      }
    }
  }
</script>

<style scoped>
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .me-title {
    margin-top: 10px;
    font-size: 24px;
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-title img {
    max-height: 3.5rem;
    max-width: 100%;
  }

  .me-header-picture {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }
</style>
