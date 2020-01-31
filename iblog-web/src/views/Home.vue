<template>
  <div id="home">
    <el-container>

      <nav-menu :activeIndex="activeIndex"></nav-menu>

      <router-view class="me-container"/>

      <base-footer v-show="footerShow"></base-footer>

    </el-container>

  </div>

</template>

<script>
  import BaseFooter from '@/components/common/basefooter/BaseFooter'
  import NavMenu from '@/components/common/navmenu/NavMenu'

  export default {
    name: 'Home',
    data() {
      return {
        activeIndex: '/',
        footerShow: true
      }
    },
    components: {
      NavMenu,
      BaseFooter
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.activeIndex = to.path
      })
    },
    beforeRouteUpdate(to, from, next) {
      if (to.path == '/') {
        this.footerShow = true
      } else {
        this.footerShow = false
      }
      this.activeIndex = to.path
      next()
    }
  }
</script>

<style>

  .me-container {
    margin: 100px auto 140px;
  }
</style>
