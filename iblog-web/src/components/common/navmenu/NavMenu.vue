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
          <!--<el-menu-item index="/myfollow">我的关注</el-menu-item>-->
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
          <template v-if="!user">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu index="">
              <template slot="title">
                <img class="me-header-picture" :src="user.headImg"/>
              </template>
              <el-menu-item index="/settings"><i class="el-icon-setting"></i>账号设置</el-menu-item>
              <el-menu-item index @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import {getUser,removeUser,removeToken} from '@/request/token'
  import {logout} from '@/network/login'

  export default {
    name: "NavMenu",
    props: {
      activeIndex: {
        type: String,
        default() {
          return ""
        }
      }
    },
    data() {
      return {
        input: '',
        default_avatar: 'http://localhost:8081/iblog/files/20200201/75e31acd-66cb-445b-8b5f-0f60112ded07_20180119173406_431.png'
      }
    },
    methods: {
      searchBlog() {
        let keyword = this.input;
        this.$router.push({path:"/index",query:{keyword:keyword}})
      },
      logout() {
        let user = getUser();
        if (!user){
          this.$message.error("请确保用户存在");
          return;
        }
        logout(user.userId).then(res=>{
          if (res.code === 200){
            this.$store.state.user = null
            removeUser();
            removeToken();
            let path = this.$route.path;
            if (path !== "/home" && path !== "/"){
              this.$router.push('/')
            }
          }
        })
      }
    },
    computed: {
      user() {
        let user = this.$store.state.user;
        if (user && user.headImg === null) {
          this.$store.state.user.headImg = this.default_avatar
        }
        return user;
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
