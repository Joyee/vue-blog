<template>
  <div class="home">
   <span v-if="userInfo">{{userInfo.username}}</span>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  }
}
</script>
