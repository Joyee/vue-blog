<template>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        unique-opened
        router
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="route in routes">
            <template v-if="route.children && route.index">
                <el-submenu :index="route.index" :key="route.path">
                    <template slot="title">{{route.title}}</template>
                    <el-menu-item v-for="item in route.children" :key="item.index" :index="item.index">{{item.title}}</el-menu-item>
                </el-submenu>
            </template>
            <el-menu-item v-else-if="route.index" :index="route.index" :key="route.path">{{route.title}}</el-menu-item>
        </template>

<!--        <el-submenu index="5" v-if="login">-->
<!--            <template slot="title">个人中心</template>-->
<!--            <el-menu-item index="5-1" :route="{name: 'set'}">设置</el-menu-item>-->
<!--            <el-menu-item index="5-2" @click="signout">注销</el-menu-item>-->
<!--        </el-submenu>-->
    </el-menu>
</template>

<script>
  import {constantRoutes} from '../router'
  export default {
    data() {
      return {
        // activeIndex: '1',
        login: false,
        routes: constantRoutes
      }
    },
    computed: {
      activeIndex () {
        return this.$route.path.replace('/', '')
      }
    },
    watch: {

    },
    methods: {
      handleSelect () {

      }
    }
  }
</script>

<style lang="less" scoped>
.el-menu-item {
    a {
        text-decoration: none;
        display: block;
    }
}
</style>