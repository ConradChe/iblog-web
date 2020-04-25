<template>
  <div>
    <div class="content"
         v-for="(item,index) in blogs" @click="getArticleInfo(item.blogId)">
      <div class="title">
        <h2>{{item.title}}</h2>
      </div>
      <div class="summery oneline">
        {{item.summary}}
      </div>
      <div class="userbar">
        <div style="float: left">
          <img :src="item.user!==null?item.user.headImg:defaultImg" class="user_img">
        </div>
        <div class="name"><span>{{item.user!==null?item.user.nickname:'user'}}</span></div>
        <div class="tag">
            <el-tag style="margin-left: 10px" size="small" type="info"  v-for="(tag,index) in item.tagList" :key="index">{{tag.tagName}}</el-tag>
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
      getArticleInfo(blogId) {
        this.$router.push({path:'/adminarticle',query:{blogId:blogId}})
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
