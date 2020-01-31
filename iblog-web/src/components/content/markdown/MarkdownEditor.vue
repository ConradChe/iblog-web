<template>
    <div>
      <mavon-editor
        class="me-editor"
        v-model="blog.content"
        ref="md"
        @change="change"
        @imgAdd="$imgAdd"
        v-bind="blog"
      />
    </div>
</template>

<script>

  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  import {upload} from '@/network/upload'

  export default {
    name: 'MarkdownEditor',
    // 注册
    components: {
      mavonEditor,
    },
    props:{
      blog: Object,
    },
    data() {
      return {
      }
    },
    methods: {
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file) {
        let formdata = new FormData();
        formdata.append('image', $file);
        upload(formdata).then(res => {
          if (res.code === 200) {
            this.$refs.md.$img2Url(pos, res.data[0].url);
          } else {
            this.$message.error(res.message)
          }

        }).catch(err => {
          console.log(err)
        })
      },
      // 所有操作都会被解析重新渲染
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.blog.contentHtml = render;
      }
    },
    mounted() {

    }

  }
</script>

<style scoped>
  .me-editor {
    z-index: 6 !important;
    min-height: 600px;
    max-width: 1200px;
  }

  .v-note-wrapper.fullscreen {
    top: 60px !important
  }


</style>
