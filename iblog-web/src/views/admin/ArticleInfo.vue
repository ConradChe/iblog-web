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
        <el-divider content-position="center" v-if="blog.blogStatus===0">审核</el-divider>
        <div style="display:flex;margin-top: 10px;" v-if="blog.blogStatus===0">
          <el-button type="primary" size="mini" style="margin: 5px 20px;height: 30px" @click="pass">通过
          </el-button>
          <el-button type="danger" size="mini" style="margin: 5px 20px;height: 30px" @click="dialogVisible = true">不通过
          </el-button>
        </div>
        <el-dialog title="审核意见" :visible.sync="dialogVisible" width="500px">
          <el-input
            type="textarea"
            placeholder="审核意见"
            v-model="checkComment"  resize="none" maxlength="250" show-word-limit="">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="refuse">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/content/markdown/MarkdownEditor'
  import {queryBlogInfo,updateBlogStatus} from '@/network/blog'

  export default {
    name: "ArticleInfo",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        dialogVisible:false,
        checkComment:'',
        blog: {
          title: '',
          content: '',
          blogId: '',
          blogStatus: '',
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: 'preview'
        },
      }
    },
    mounted() {
      console.log(this.$route.query);
      let param = {}
      param.blogId = this.$route.query.blogId;
      this.queryBlogInfo(param);
    },
    methods: {
      queryBlogInfo(param){
        queryBlogInfo(param).then(res=>{
          if (res.code === 200){
            let data = res.data[0];
            console.log(data);
            this.blog.blogId = data.blogId;
            this.blog.content = data.content;
            this.blog.title = data.title;
            this.blog.blogStatus = data.blogStatus;
          }
        })
      },
      pass(){
        this.$confirm('是否确定通过？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let param = {}
          param.blogStatus = 1;
          param.blogId = this.blog.blogId;
          this.updateBlogStatus(param)
        }).catch(err=>{
          this.$message.error(err);
        })
      },
      refuse(){
        let checkComment = this.checkComment
        if (checkComment == null || checkComment.trim().length===0){
          this.$message.error('请输入审核意见');
          return;
        }
        let param = {}
        param.blogStatus = 2;
        param.blogId = this.blog.blogId;
        param.checkComment = checkComment;
        this.updateBlogStatus(param)
      },
      updateBlogStatus(param){
        updateBlogStatus(param).then(res=>{
          if (res.code === 200){
            this.$message.success(res.message)
            this.$router.go(-1);
          }else {
            this.$message.error(res.message)
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .me-view-body {
    margin: 30px auto 140px;
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
    height: 100px;
    line-height: 100px;
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

  .user-box {
    position: absolute;
    left: 20px;
    top: 80px;
    width: 200px;
    height: 100px;
    padding: 10px;
  }

  .user_img {
    position: relative;
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }

</style>
