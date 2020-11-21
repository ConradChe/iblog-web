<template>
  <div id="register" data-title="注册 - IBLOG">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">-->
      <!--<source src="../../static/vedio/sea.mp4" type="video/mp4">-->
    <!--</video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>IBLOG 注册</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model="userForm.phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input placeholder="验证码" v-model="userForm.code" style="width: 150px"></el-input>
          <el-button type="primary" @click="getPhoneCode" :disabled="isGetCode">{{isGetCode?count+'秒后重新获取':'获取验证码'}}</el-button>
        </el-form-item>

        <el-form-item prop="nickname">
          <el-input placeholder="昵称" v-model="userForm.nickname"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="userForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item prop="repass">
          <el-input placeholder="确认密码" v-model="userForm.repass" type="password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="register('userForm')">注册</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>已有账号？
          <strong>
            <router-link to="/login" class="me-login-design-color">登录</router-link>
          </strong>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  import {isPoneAvailable} from '@/common/utils'
  import {register} from '@/network/login'
  import {setToken,getUser} from '@/request/token'
  import {getCode} from '@/network/code'

  export default {
    name: 'Register',
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
        if (!isPoneAvailable(value)) {
          return callback(new Error('手机号格式不正确'));
        }
        return callback();
      };
      var checkRepass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入密码'));
        }
        if (value !== this.userForm.password) {
          return callback(new Error('两次输入密码不一致!'));
        }
        return callback();
      };
      return {
        userForm: {
          phone: '',
          code: '',
          nickname: '',
          password: '',
          repass: ''
        },
        count:60,
        isGetCode:false,
        rules: {
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          repass: [
            {validator: checkRepass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      register(formName) {
        let that = this

        this.$refs[formName].validate((valid) => {
          if (valid) {
            register(that.userForm).then(res => {
              if (res.code === 200) {
                //保存token
                setToken(res.data[0])
                this.$store.state.user = getUser();
                this.$router.push('/')
              } else {
                this.$message.error(res.message);
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            return false;
          }
        });

      },
      getPhoneCode(){
        getCode({phone:this.userForm.phone}).then(res=>{
          if (res.code === 200) {
            this.$message.success(res.message);
            this.countdown();
          } else {
            this.$message.error(res.message);
          }
        }).catch(err=>{
          this.$message.error(err);
        });
      },
      countdown(){
        let interval = setInterval(()=>{
          let count = this.count;
          if (count>0){
            this.isGetCode = true
            this.count--;
          } else {
            this.isGetCode = false;
            this.count = 60
            clearInterval(interval)
          }
        },1000)
      }

    }
  }
</script>

<style scoped>
  #register {
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
    height: 450px;
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
