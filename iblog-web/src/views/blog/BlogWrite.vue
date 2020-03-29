<template>
  <div id="write">
    <el-container>
      <el-header class="me-write">
        <el-col :span="4" :offset="4">
          <div>
            <img class="logo" src="@/assets/image/logo.png"/>
          </div>
        </el-col>
        <el-col :span="4" :offset="12">
          <div class="me-write-info">写文章</div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="me-write-btn">
            <el-button round @click="publishShow" type="primary">发布</el-button>
            <el-button round @click="cancel">取消</el-button>
          </div>
        </el-col>
      </el-header>

      <el-container class="me-area me-write-box">
        <el-main class="me-write-main">
          <div class="me-write-title">
            <el-input resize="none"
                      type="textarea"
                      autosize
                      v-model="articleForm.title"
                      placeholder="请输入标题"
                      class="me-write-input">
            </el-input>
          </div>
          <div id="placeholder" style="visibility: hidden;height: 89px;display: none;"></div>
          <markdown-editor :blog="articleForm" class="me-write-editor"></markdown-editor>
        </el-main>
      </el-container>

      <el-dialog title="摘要 分类 标签"
                 :visible.sync="publishVisible"
                 :close-on-click-modal=false
                 custom-class="me-dialog">

        <el-form :model="articleForm" ref="articleForm" :rules="rules">
          <el-form-item prop="summary">
            <el-input type="textarea"
                      v-model="articleForm.summary"
                      :rows="6"
                      placeholder="请输入文章摘要">
            </el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="category">
            <el-select v-model="articleForm.category" value-key="categoryId" placeholder="请选择文章分类"
                       filterable allow-create>
              <el-option v-for="c in categorys" :key="c.categoryId" :label="c.categoryName" :value="c"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文章标签" prop="tagIds">
            <el-checkbox-group v-model="articleForm.tagIds" :max="3">
              <el-checkbox v-for="t in tagList" :key="t.tagId" :label="t.tagId">{{t.tagName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="是否公开" prop="isHide">
            <el-radio-group v-model="articleForm.isHide">
              <el-radio label="1">公开</el-radio>
              <el-radio label="2">私密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="publishVisible = false">取 消</el-button>
          <el-button type="primary" @click="publish('articleForm')">发布</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/content/markdown/MarkdownEditor'
  import {getCategory} from '@/network/category'
  import {getTags} from '@/network/tag'
  import {addBlog, updateBlog} from '@/network/blog'

  export default {
    name: 'BlogWrite',
    components: {
      MarkdownEditor
    },
    data() {
      return {
        publishVisible: false,
        categorys: [],
        tagList: [],
        articleForm: {
          content: '',
          title: '',
          contentHtml: '',
          category: '',
          categoryId: '',
          categoryName: '',
          summary: '',
          tagIds: [],
          isHide: '1'
        },
        isUpdate: false,
        rules: {
          summary: [
            {required: true, message: '请输入摘要', trigger: 'blur'},
            {max: 80, message: '不能大于80个字符', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择文章分类', trigger: 'change'}
          ],
          tagIds: [
            {type: 'array', required: true, message: '请选择标签', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      this.getCategoryAndTags();
      let blog = this.$route.query.blog
      if (blog) {
        this.isUpdate = true
        this.articleForm = blog
        let tagIds = blog.tagList.map(tag => {
          return tag.tagId
        })
        let category = {}
        category.categoryId = blog.categoryId
        category.categoryName = blog.categoryName
        this.articleForm.category = category
        this.articleForm.isHide = blog.isHide + ''
        this.articleForm.tagIds = tagIds
      }
    },
    methods: {
      publish(articleForm) {
        let that = this
        this.$refs[articleForm].validate((valid) => {
          if (valid) {
            let articleForm = that.articleForm;
            let category = articleForm.category;
            if (typeof (category) == "object") {
              articleForm.categoryId = category.categoryId;
              articleForm.categoryName = category.categoryName;
            } else {
              articleForm.categoryId = '';
              articleForm.categoryName = category;
            }
            if (that.isUpdate) {
              updateBlog(articleForm).then(res => {
                if (res.code === 200) {
                  that.$message.success(res.message);
                  that.$router.go(-1)
                } else {
                  that.$message.error(res.message);
                }
              }).catch(err => {
                console.log(err);
              })
            } else {
              addBlog(articleForm).then(res => {
                if (res.code === 200) {
                  that.$message.success(res.message);
                  that.$router.push('/')
                } else {
                  that.$message.error(res.message);
                }
              }).catch(err => {
                console.log(err);
              })
            }

          } else {
            return false;
          }
        })
      },
      publishShow() {
        if (!this.articleForm.title) {
          this.$message({message: '标题不能为空哦', type: 'warning', showClose: true})
          return
        }

        if (this.articleForm.title.length > 30) {
          this.$message({message: '标题不能大于30个字符', type: 'warning', showClose: true})
          return
        }

        if (!this.articleForm.content) {
          this.$message({message: '内容不能为空哦', type: 'warning', showClose: true})
          return
        }

        this.publishVisible = true;
      },
      cancel() {
        this.$confirm('文章将不会保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/')
        })
      },
      getCategoryAndTags() {
        let that = this
        //查询分类
        getCategory().then(res => {
          if (res.code === 200) {
            that.categorys = res.data
            //查询标签
            getTags().then(res => {
              if (res.code === 200) {
                that.tagList = res.data
              } else {
                that.$message.error("分类查询失败");
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            that.$message.error("分类查询失败");
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style>
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .me-write {
    position: relative;
    z-index: 6 !important;
  }

  .me-write-info {
    line-height: 60px;
    font-size: 18px;
    font-weight: 600;
    color: burlywood;
  }

  .logo {
    position: absolute;
    height: 100%;
    line-height: 60px;
  }

  .me-write-btn {
    position: absolute;
    margin-top: 10px;
    right: 10px;
  }

  .me-write-box {
    max-width: 1000px;
    margin: 20px auto 0;
  }

  .me-write-main {
    padding: 0;
  }

  .me-write-title {
    border-bottom: solid 1px #404040;
  }

  .me-write-input textarea {
    font-size: 32px;
    font-weight: 500;
    height: 20px;
    border: none;
  }

  .me-write-editor {
    min-height: 650px !important;
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .me-write-toolbar-fixed {
    position: fixed;
    width: 1000px !important;
    top: 60px;
  }

  .v-note-op {
    box-shadow: none !important;
  }

  .auto-textarea-input, .auto-textarea-block {
    font-size: 18px !important;
  }
</style>
