<template>
  <div class="main-box">
    <el-row class="tac">
      <el-col :span="6">
        <el-menu
          :default-active="menuPath"
          class="el-menu-vertical-demo"
          @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div class="from-box">
          <template v-if="menuPath==='1'">
            <h4>个人资料</h4>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="头像">
                <div @click="uploadImg">
                  <img :src="form.headImg" class="avatar">
                  <span style="color: #409EFF;cursor: pointer">更换头像</span>
                  <input id="file" type="file" @change="addImage" ref="avatarInput" style="display: none">
                </div>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.nickname" style="width: 200px" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name" style="width: 200px" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                                style="width: 200px" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="爱好">
                <el-input type="textarea" v-model="form.hobby" style="width: 300px;"
                          placeholder="请输入爱好" resize="none"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address" style="width: 200px" placeholder="请输入省市"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </template>
          <template v-else>
            <h4>修改密码</h4>
            <el-form ref="passwordForm" :model="passwordForm" label-width="80px">
              <el-form-item label="旧密码" prop="prePass">
                <el-input v-model="passwordForm.prePass" style="width: 200px" type="password" placeholder="请输入旧密码"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPass">
                <el-input v-model="passwordForm.newPass" style="width: 200px" type="password" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="rePass">
                <el-input v-model="passwordForm.rePass" style="width: 200px" type="password" placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePass()">保存</el-button>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {upload} from '@/network/upload'
  import {updateUser,queryUserInfo,changePass} from '@/network/user'
  import {setUser} from '@/request/token'
  import {isEmpty} from '@/common/utils'

  export default {
    name: "Settings",
    data() {
      return {
        form: {
          nickname: '',
          birthday: '',
          name: '',
          gender: '1',
          hobby: '',
          address: '',
          headImg: 'http://localhost:8081/iblog/files/20200201/75e31acd-66cb-445b-8b5f-0f60112ded07_20180119173406_431.png'
        },
        passwordForm:{
          prePass:'',
          newPass:'',
          rePass:''
        },
        //判断图片的类型
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg',
        },
        menuPath:'1'
      }
    },
    mounted(){
      this.queryUserInfo();
    },
    methods: {
      queryUserInfo(){
        queryUserInfo().then(res=>{
          if (res.code === 200) {
            console.log(res.data[0]);
            this.form = res.data[0]
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleSelect(key, keyPath) {
        this.menuPath = key
      },
      onSubmit() {
        updateUser(this.form).then(res=>{
          if (res.code === 200) {
            setUser(this.form);
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      addImage(event) {
        let reader = new FileReader();
        let img = event.target.files[0];
        let type = img.type; //文件的类型，判断是否是图片
        let size = img.size; //文件的大小，判断图片的大小
        if (this.imgData.accept.indexOf(type) == -1) {
          alert('不支持的图片格式！');
          return false;
        }
        //图片的大小
        if (size > 3145728) {
          alert('请选择3M以内的图片！');
          return false;
        }
        let formdata = new FormData();
        formdata.append('image', img);
        upload(formdata).then(res => {
          if (res.code === 200) {
            reader.readAsDataURL(img);
            let that = this;
            reader.onloadend = function () {
              that.form.headImg = res.data[0].url;
            }
          } else {
            this.$message.error(res.message)
          }

        }).catch(err => {
          console.log(err)
        })
      },
      uploadImg() {
        this.$refs.avatarInput.dispatchEvent(new MouseEvent('click'));
      },
      changePass(){
        let passFrom = this.passwordForm
        if (isEmpty(passFrom.prePass)){
          this.$message.warning("请输入旧密码");
          return
        }
        if (isEmpty(passFrom.newPass)){
          this.$message.warning("请输入新密码");
          return
        }
        if (isEmpty(passFrom.rePass)){
          this.$message.warning("请确认密码");
          return
        }
        if (passFrom.newPass !== passFrom.rePass) {
          this.$message.warning("两次密码不一致");
          return
        }
        console.log(passFrom);
        changePass(passFrom).then(res=>{
          if (res.code === 200){
            this.$message.success(res.message)
            this.$router.push("/login")
          }else {
            this.$message.warning(res.message)
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }

  }
</script>

<style scoped>
  .main-box {
    width: 1000px;
  }

  .from-box {
    background: #fff;
    padding: 20px;
  }

  h4 {
    margin-bottom: 10px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
