<template>
  <div class="blog-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="null">
        <div style="text-align: center" v-if="blogs.length===0">
          空空如也
        </div>
        <div class="blog-box" v-else>
          <article-title :blogs="blogs" :isShow="false"/>
        </div>
      </el-tab-pane>
      <el-tab-pane v-for="item in categorys" :label="item.categoryName" :name="item.categoryId" :key="item.categoryId">
        <div style="text-align: center" v-if="blogs.length===0">
          空空如也
        </div>
        <div class="blog-box" v-else>
          <article-title :blogs="blogs" :isShow="false"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ArticleTitle from '@/views/home/article/ArticleTitle'
  import {queryBlogOfUser} from '@/network/blog'
  import {getCategory} from '@/network/category'
  export default {
    name: "BlogManage",
    components:{
      ArticleTitle
    },
    data() {
      return {
        activeName: 'null',
        blogs:[],
        categorys:[]
      };
    },
    mounted(){
      this.queryBlog()
      this.queryCategory()
    },
    methods: {
      //查询用户文章分类
      queryCategory(){
        getCategory().then(res=>{
          if (res.code===200){
            this.categorys = res.data
          } else {
            console.log(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      handleClick(tab) {
        this.activeName = tab.paneName
        this.queryBlog();
      },
      queryBlog(){
        let param = {}
        param.categoryId = this.activeName
        queryBlogOfUser(param).then(res=>{
          if (res.code===200){
            this.blogs = res.data
          } else {
            this.$message.error(res.message)
          }
        }).catch(err=>{
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>
  .blog-manage{
    width: 750px;
  }

  .blog-box{
    width: 100%;
  }
</style>
