<template>
  <div id="admin-home">
    <el-container>

      <nav-bar/>

      <router-view class="me-container"/>

      <base-footer/>

    </el-container>

  </div>
</template>

<script>
  import BaseFooter from '@/components/common/basefooter/BaseFooter'
  import NavBar from '@/components/common/navmenu/NavBar'
  export default {
    name: "AdminHome",
    components: {
      NavBar,
      BaseFooter
    }
  }
</script>

<style scoped>
  .me-container {
    margin: 100px auto 140px;
  }
</style>
