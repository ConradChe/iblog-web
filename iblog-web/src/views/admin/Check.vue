<template>
  <div>
    <article-title :blogs="blogs" :isShow="true"/>
    <div style="background: #fff;text-align: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParam.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="searchParam.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ArticleTitle from './ArticleTitle'
  import {queryBlogByStatus} from '@/network/blog'
  export default {
    name: "Pending",
    components:{
      ArticleTitle
    },
    data(){
      return{
        text:'待审核',
        blogs:[
          {
            title:"这是一个测试标题",
            summary:"这是一个测试的摘要",
            likeNum:0,
            viewNum:0,
            commentNum:1,
            user:{},
            tagList:[]
          }
        ],
        total:0,
        searchParam:{
          page:1,
          limit:5,
          blogStatus:'0'
        }
      }
    },
    watch:{
      $route: {
        handler: function (val) {
          let id = val.params.id
          this.searchParam.blogStatus = id;
          this.searchParam.page = 1;
          this.searchParam.limit = 5;
          this.getBlog(this.searchParam);
        },
        // 深度观察监听
        deep: true
      }
    },
    mounted(){
      this.searchParam.blogStatus = this.$route.params.id
      this.getBlog(this.searchParam);
    },
    methods:{
      handleSizeChange(val) {
        this.searchParam.limit = val
        this.getBlog(this.searchParam);
      },
      handleCurrentChange(val) {
        this.searchParam.page = val
        this.getBlog(this.searchParam);
      },
      getBlog(param){
        queryBlogByStatus(param).then(res=>{
          if (res.code === 200){
            this.blogs = res.data
            this.total = res.total
          }else {
            this.$message.error(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>

</style>
