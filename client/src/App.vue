<template>
  <div id="app">
    <NavMenu/>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from '@components/NavMenu.vue'

  export default {
    components: {
      NavMenu
    }
  }
</script>
<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
