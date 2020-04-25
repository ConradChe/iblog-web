<template>
  <div id="login" data-title="登录 - IBLOG">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">-->
      <!--<source src="../../static/vedio/sea.mp4" type="video/mp4">-->
    <!--</video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>IBLOG 登录</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model="userForm.phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="userForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>没有账号？
          <strong>
            <router-link to="/register" class="me-login-design-color">注册</router-link>
          </strong>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  import {isPoneAvailable} from '@/common/utils'
  import {doLogin} from '@/network/login'
  import {setToken,getUser} from '@/request/token'

  export default {
    name: 'Login',
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'));
        }
        if (!isPoneAvailable(value)) {
          return callback(new Error('手机号格式错误'));
        }
        return callback();
      };
      return {
        userForm: {
          phone: '',
          password: ''
        },
        rules: {
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            doLogin(this.userForm).then(res =>{
              if (res.code === 200){
                //保存token
                let data = res.data[0];
                setToken(data)
                let user = data.user
                this.$store.state.user = getUser();
                //跳转到首页
                if (user.role===1){
                  this.$router.push('/admin')
                } else {
                  this.$router.push('/')
                }
              } else {
                this.$message.error(res.message);
              }
            }).catch(err =>{
              console.log(err);
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  #login {
    min-width: 100%;
    min-height: 100%;
  }

  .me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: absolute;
    left: 0;
    z-index: 0;
    top: 0;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 260px;
    background-color: white;
    margin-top: 150px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-design {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }

</style>
