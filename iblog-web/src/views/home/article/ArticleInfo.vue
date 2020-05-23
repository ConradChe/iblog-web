<template>
  <div class="me-view-body">
    <el-container class="me-view-container">
      <el-main>
        <!--<div class="user-box" v-if="user">-->
        <!--<div>-->
        <!--<img :src="user.headImg!==null?user.headImg:defaultImg" class="user_img">-->
        <!--<span>{{user.nickname}}</span>-->
        <!--<el-button type="primary" round size="mini" style="float: right">关注</el-button>-->
        <!--</div>-->
        <!--</div>-->
        <div class="me-view-card">
          <h2 class="me-view-title">{{blog.title}}</h2>
          <div class="me-view-content">
            <markdown-editor :blog="blog"></markdown-editor>
          </div>
        </div>
        <div style="display: flex;margin-top: 10px" class="upOperation">
          <div @click="doUpvote">
            <span>
              <i class="el-icon-thumb" v-if="!islike"></i>
              <i class="el-icon-thumb" style="color: red" v-else></i>
            </span>
            <span>{{islike?'已赞':'点赞'}}</span>
            <span>{{upvoteNum}}</span>
          </div>
          <div style="margin-left: 15px" @click="isShowComment">
            <span><i class="el-icon-chat-dot-square"></i></span>
            <span>评论</span>
            <span>{{commentNum}}</span>
          </div>
        </div>
        <div style="display:flex;margin-top: 10px;" v-if="showComment">
          <el-input
            type="textarea"
            placeholder="评论内容"
            v-model="comment" style="width: 80%;" resize="none" maxlength="200" show-word-limit="">
          </el-input>
          <el-button type="primary" size="mini" style="margin: 5px 20px;height: 30px" @click="commentOperate">评论
          </el-button>
        </div>
        <!--全部评论内容-->
        <div style="margin-top: 10px;">
          <div v-for="item in commentList">
            <div @mouseenter="enter(item.commentId)" @mouseleave="leave()">
              <img :src="item.user!==null?item.user.headImg:defaultImg" class="user_img">
              <strong>{{item.user.nickname}}</strong>
              <span style="margin-left: 20px;color: darkgray;font-size: 10px">{{item.createTime}}</span>
              <span style="float: right;color: #3759d3;cursor:pointer;"
                    @click="reply(item.commentId)" v-if="applyId==item.commentId">回复</span>
              <div style="color: #6d6d6d;margin: 10px 30px">
                {{item.commentText}}
              </div>
            </div>
            <div v-if="commentId==item.commentId" style="display:flex;margin: 10px;">
              <el-input
                type="textarea"
                :placeholder="'回复'+item.user.nickname"
                v-model="applyText" style="width: 80%;" resize="none" maxlength="200" show-word-limit="">
              </el-input>
              <el-button type="primary" size="mini" style="margin: 5px 20px;height: 30px"
                         @click="doApply(item.commentId,item.user.userId)">回复
              </el-button>
            </div>
            <!--子评论内容-->
            <div style="margin-left: 20px">
              <div v-for="i in item.childrenList">
                <div @mouseenter="enter(i.commentId)" @mouseleave="leave()">
                  <img :src="i.user!==null?i.user.headImg:defaultImg" class="user_img">
                  <strong>{{i.user.nickname}}</strong>
                  <span style="padding: 0 10px;color: #6d6d6d;">回复</span>
                  <img :src="i.byUser!==null?i.byUser.headImg:defaultImg" class="user_img">
                  <strong>{{i.byUser.nickname}}</strong>
                  <span style="margin-left: 20px;color: darkgray;font-size: 10px">{{i.createTime}}</span>
                  <span style="float: right;color: #3759d3;cursor:pointer;"
                        @click="reply(i.commentId)" v-if="applyId==i.commentId">回复</span>
                  <div style="color: #6d6d6d;margin: 10px 30px">
                    {{i.commentText}}
                  </div>
                </div>
                <div v-if="commentId==i.commentId" style="display:flex;margin: 10px;">
                  <el-input
                    type="textarea"
                    :placeholder="'回复'+i.user.nickname"
                    v-model="applyText" style="width: 80%;" resize="none" maxlength="200" show-word-limit="">
                  </el-input>
                  <el-button type="primary" size="mini" style="margin: 5px 20px;height: 30px"
                             @click="doApply(item.commentId,i.user.userId)">回复
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/content/markdown/MarkdownEditor'
  import {setBlogView} from '@/network/blog'
  import {selectUpvoteCountById,selectUpvoteById,doUpvote,cancleUpvote} from '@/network/upvote'
  import {insertComment, queryComment} from '@/network/comment'
  import {getUser} from '@/request/token'
  import defaultImg from '@/assets/image/head_img.png'

  export default {
    name: "ArticleInfo",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        blog: {
          title: '',
          content: '',
          blogId: '',
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: 'preview'
        },
        user: {
          headImg: '',
          nickname: ''
        },
        defaultImg: defaultImg,
        comment: '',
        applyText: '',
        commentId: '',
        applyId: '',
        upvoteNum:0,
        commentNum:0,
        showComment:false,
        islogin:false,
        islike:false,
        commentList: []
      }
    },
    mounted() {
      let blog = this.$route.query.blog
      this.user = blog.user
      this.blog.title = blog.title
      this.blog.content = blog.content
      this.blog.blogId = blog.blogId
      this.commentNum = blog.commentNum
      let param = {}
      param.blogId = blog.blogId
      this.setView(param);
      this.queryComment();
      this.getUpvoteNum();
      this.isLogin();
    },
    methods: {
      setView(param) {
        setBlogView(param).then(res => {
          if (res.code === 200) {
            console.log('success');
          } else {
            this.$message.error(res.message);
          }
        })
      },
      commentOperate() {
        if (this.comment.length === 0) {
          this.$message.warning("评论不可为空");
          return;
        }
        let param = {}
        param.blogId = this.blog.blogId
        param.commentText = this.comment
        insertComment(param).then(res => {
          if (res.code === 200) {
            this.comment = ''
            this.queryComment()
            this.commentNum++;
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      },
      queryComment() {
        let param = {}
        param.blogId = this.blog.blogId
        queryComment(param).then(res => {
          if (res.code === 200) {
            console.log(res.data);
            this.commentList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
      },
      reply(commentId) {
        this.applyText = ''
        this.commentId = commentId;
      },
      doApply(commentId, userId) {
        if (this.applyText.length === 0) {
          this.$message.warning("回复内容不可为空");
          return
        }
        let param = {}
        param.blogId = this.blog.blogId
        param.commentText = this.applyText
        param.parentId = commentId
        param.byId = userId
        insertComment(param).then(res => {
          if (res.code === 200) {
            this.applyText = ''
            this.commentId = ''
            this.commentNum++;
            this.queryComment()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      },
      enter(commentId) {
        this.applyId = commentId
      },
      leave() {
        this.applyId = ''
      },
      isShowComment(){
        this.showComment = true
      },
      //获取点赞数
      getUpvoteNum(){
        let param = {}
        param.blogId = this.blog.blogId
        selectUpvoteCountById(param).then(res=>{
          if (res.code === 200){
            this.upvoteNum = res.data[0].upvoteNum
          }
        })
      },
      isLogin(){
        if (getUser()){
          this.islogin = true;
          let param = {}
          param.blogId = this.blog.blogId
          selectUpvoteById(param).then(res=>{
            if (res.code===200){
              if (res.data[0]){
                this.islike = true;
              } else {
                this.islike = false;
              }
            }
          })
        } else {
          this.islogin = false;
        }
      },
      doUpvote(){
        let param = {}
        param.blogId = this.blog.blogId
        //已赞则取消点赞
        if (this.islike){
          cancleUpvote(param).then(res=>{
            if (res.code===200){
              this.islike = !this.islike
              --this.upvoteNum
            }
          })
        }else {
          doUpvote(param).then(res=>{
            if (res.code===200){
              this.islike = !this.islike
              ++this.upvoteNum
            }
          })
        }
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

  .upOperation div{
    height: 40px;
    line-height: 40px;
    border: solid 1px #e5e5e5;
    background-color: #e5e5e5;
    border-radius: 5px;
    padding: 0 5px;
    cursor: pointer;
  }

</style>
