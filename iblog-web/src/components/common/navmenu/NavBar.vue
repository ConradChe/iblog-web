<template>
  <el-header class="me-area" height="70px">
    <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal">
      <div class="me-title">
        <img src="@/assets/image/logo.png" class="logo"/>
      </div>
      <el-menu-item index="/check/0">待审核</el-menu-item>
      <el-menu-item index="/check/1">审核通过</el-menu-item>
      <el-menu-item index="/check/2">审核不通过</el-menu-item>
      <div class="user">
        <template v-if="!user">
          <el-menu-item index="/login">
            <el-button type="text"  style="color: deepskyblue">登录</el-button>
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index @click="logout">
            <el-button type="text"  style="color: deepskyblue">退出</el-button>
          </el-menu-item>
        </template>
      </div>
    </el-menu>
  </el-header>
</template>

<script>
  import {getUser,removeUser,removeToken} from '@/request/token'
  import {logout} from '@/network/login'
  export default {
    name: "NavBar",
    data() {
      return {
        activeIndex: '1'
      };
    },
    computed:{
      user() {
        let user = this.$store.state.user;
        return user;
      }
    },
    methods: {
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
    }
  }
</script>

<style scoped>
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    /*box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);*/
  }

  .me-title {
    margin: 10px 50px 0;
    font-size: 24px;
    float: left;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .user{
    margin-right: 50px;
    float: right;
    display: flex;
  }

</style>
