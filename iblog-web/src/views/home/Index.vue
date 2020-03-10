<template>
  <div>
    <article-title :blogs="blogs"/>
  </div>
</template>

<script>
  import ArticleTitle from './article/ArticleTitle'
  import {findBlog} from '@/network/blog'

  export default {
    name: "Index",
    components:{
      ArticleTitle
    },
    data(){
      return{
        blogs:[
          {
            title:"这是一个测试标题",
            summary:"这是一个测试的摘要",
            likeNum:0,
            viewNum:0,
            commentNum:1
          }
        ]
      }
    },
    mounted(){
      this.findAllblogs();
    },
    methods:{
      findAllblogs(){
        findBlog().then(res=>{
          if (res.code === 200){
            this.blogs = res.data
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
