<template>
    <el-row class="login-wrap">
        <el-col :offset="8" :span="8">
            <BaseForm/>
        </el-col>
    </el-row>
</template>

<script>
  import BaseForm from '@components/BaseForm.vue'

  export default {
    components: {
      BaseForm
    },
    data() {
      return {

      }
    },
    watch: {

    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        margin-top: 40px;
    }
</style>