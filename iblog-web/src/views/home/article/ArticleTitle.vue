<template>
  <div>
    <div class="content"
         v-for="(item) in blogs"
         @click="getArticleInfo(item.blogId)">
      <div class="title">
        <h2>{{item.title}}</h2>
      </div>
      <div class="summery oneline">
        {{item.summary}}
      </div>
      <div class="userbar">
        <div style="float: left">
          <img src="@/assets/image/head_img.png" class="user_img">
        </div>
        <div class="name"><span>conrad</span></div>
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ArticleTitle",
    props: {
      blogs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getArticleInfo(id) {
        this.$router.push({path: '/article', query: {blogId: id}})
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
</style>
