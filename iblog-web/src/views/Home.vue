<template>
  <div id="home">
    <el-container>

      <nav-menu :activeIndex="$store.state.activeIndex"/>

      <router-view class="me-container"/>

      <base-footer/>

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
        // activeIndex: this.$store.state.activeIndex,
        // baseShow: this.$store.state.baseShow
      }
    },
    components: {
      NavMenu,
      BaseFooter
    }
  }
</script>

<style>

  .me-container {
    margin: 100px auto 140px;
  }
</style>
