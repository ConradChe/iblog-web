<template>
  <div class="me-view-body">
    <el-container class="me-view-container">
      <el-main>
        <div class="me-view-card">
          <h2 class="me-view-title">{{blog.title}}</h2>
          <div class="me-view-content">
            <markdown-editor :blog="blog"></markdown-editor>
          </div>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/content/markdown/MarkdownEditor'
  import {findBlog} from '@/network/blog'

  export default {
    name: "ArticleInfo",
    components:{
      MarkdownEditor
    },
    data() {
      return {
        blog: {
          title:'',
          content: '',
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: 'preview'
        },
        blogParam:{
          blogId:this.$route.query.blogId
        }

      }
    },
    mounted() {
      this.getBlogInfo();
    },
    methods: {
      getBlogInfo() {
        findBlog(this.blogParam).then(res => {
          if (res.code === 200) {
            this.blog.title = res.data[0].title;
            this.blog.content = res.data[0].content;
          } else {
            this.$message.error(res.message);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .me-view-body {
    margin: 20px auto 140px;
  }

  .me-view-container {
    width: 800px;
  }

  .el-main {
    overflow: hidden;
  }

  .me-view-title {
    margin: 0;
    width: 100%;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    font-size: 28px;
    color: #202326;
    font-weight: 500;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0;
  }

  .me-view-author {
    /*margin: 30px 0;*/
    margin-top: 30px;
    vertical-align: middle;
  }

  .me-view-picture {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }

  .me-view-info {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
  }

  .me-view-meta {
    font-size: 12px;
    color: #969696;
  }

  .me-view-end {
    margin-top: 20px;
    padding-right: 25px;
  }

  .me-view-tag {
    margin-top: 20px;
    padding-left: 6px;
    border-left: 4px solid #c5cac3;
  }

  .me-view-tag-item {
    margin: 0 4px;
  }

  .me-view-comment {
    margin-top: 60px;
  }

  .me-view-comment-title {
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
  }

  .me-view-comment-write {
    margin-top: 20px;
  }

  .me-view-comment-text {
    font-size: 16px;
  }

  .v-show-content {
    padding: 8px 25px 15px 0px !important;
  }

  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }


</style>
