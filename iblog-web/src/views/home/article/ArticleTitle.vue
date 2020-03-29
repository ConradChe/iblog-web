<template>
  <div>
    <div class="content"
         v-for="(item,index) in blogs">
      <div class="title" @click="getArticleInfo(item)">
        <h2>{{item.title}}</h2>
      </div>
      <div class="summery oneline" @click="getArticleInfo(item)">
        {{item.summary}}
      </div>
      <div class="userbar">
        <div style="float: left" v-if="isShow">
          <img :src="item.user!==null?item.user.headImg:defaultImg" class="user_img">
        </div>
        <div class="name" v-if="isShow"><span>{{item.user!==null?item.user.nickname:'user'}}</span></div>
        <div class="name" v-else>
          <span style="color: black">{{item.isHide===1?'公开文章':'私密文章'}}</span>
          <span>|</span>
          <span @click.stop="updateBlog(item)">修改</span>
          <span>|</span>
          <span @click.stop="deleteBlog(item.blogId)">删除</span>
          <span v-if="item.isHide===2">
            <span>|</span>
            <span @click.stop="openBlog(item,index)">公开</span>
          </span>
          <span v-else>
            <span>|</span>
          <span @click.stop="hideBlog(item,index)">隐藏</span>
          </span>
        </div>
        <div class="tag">
            <el-tag style="margin-left: 10px" size="small" type="info"  v-for="(tag,index) in item.tagList" :key="index">{{tag.tagName}}</el-tag>
        </div>
        <div class="interactive">
          <p>
            <span><i class="el-icon-thumb"></i></span>
            <span>{{item.likeNum}}</span>
          </p>
          <p>
            <span><i class="el-icon-view"></i></span>
            <span>{{item.viewNum}}</span>
          </p>
          <p>
            <span><i class="el-icon-chat-dot-square"></i></span>
            <span>{{item.commentNum}}</span>
          </p>
        </div>
        <div class="pass" v-if="!isShow">
          <span :class="item.blogStatus===0?'yellow':item.blogStatus===1?'blue':'red'">
            {{item.blogStatus===0?'审核中':item.blogStatus===1?'审核通过':'未通过'}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import defaultImg from '@/assets/image/head_img.png'
  import {deleteBlog,hideBlog} from '@/network/blog'

  export default {
    name: "ArticleTitle",
    props: {
      blogs: {
        type: Array,
        default() {
          return []
        }
      },
      isShow: Boolean
    },
    data() {
      return {
        defaultImg: defaultImg
      }
    },
    methods: {
      getArticleInfo(item) {
        this.$router.push({path: '/article', query: {blog: item}})
      },
      updateBlog(item){
        this.$router.push({path:'/write',query:{blog:item}})
      },
      deleteBlog(blogId){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let param = {};
          param.blogId = blogId
          deleteBlog(param).then(res=>{
            if (res.code === 200){
              this.$message.success(res.message)
              this.deleteLocalBlog(blogId);
            } else {
              this.$message.error(res.message)
            }
          }).catch(err=>{
            console.log(err);
          })
        }).catch(err=>{
          console.log(err);
        })
      },
      deleteLocalBlog(blogId){
        //删除本地数据
        this.blogs.some((item,i)=>{
          if (item.blogId == blogId){
            this.blogs.splice(i,1)
            return true
          }
        })
      },
      openBlog(blog,index){
        this.$confirm('是否确定公开该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          blog.isHide = 1
          let param = {}
          param.isHide = 1
          param.blogId = blog.blogId
          this.updateRequest(param);
        }).catch(err=>{
          console.log(err);
        })
      },
      hideBlog(blog,index){
        this.$confirm('是否确定隐藏该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          blog.isHide = 2
          let param = {}
          param.isHide = 2
          param.blogId = blog.blogId
          this.updateRequest(param);
        }).catch(err=>{
          console.log(err);
        })
      },
      updateRequest(param){
        hideBlog(param).then(res => {
          if (res.code === 200) {
            this.$message.success("成功");
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    border-bottom: #e0e0e0 1px solid;
    background: #fff;
    padding: 15px;
    width: 700px;
    max-height: 100px;
    margin-bottom: 1px;
    cursor:pointer;
  }

  .title h2 {
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    height: 24px;
    margin-bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
  }

  .summery {
    margin-bottom: 4px;
    color: #8a8a8a;
    font-size: 14px;
    line-height: 24px;
  }

  .oneline {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .userbar {
    height: 24px;
    line-height: 24px;
  }

  .user_img {
    position: relative;
    display: inline-block;
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }

  .name {
    float: left;
    font-size: 14px;
    color: #8a8a8a;
    line-height: 24px;
    margin-left: 10px;
  }

  .interactive {
    line-height: 24px;
    float: right;
  }

  .interactive p {
    float: left;
    font-size: 15px;
    line-height: 24px;
    margin-left: 10px;
  }

  .tag{
    float: left;
    margin-left: 10px;
  }

  .pass{
    float: right;
    font-size: 14px;
  }
</style>
