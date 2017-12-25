<template>
    <div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <Tab></Tab>
    </div>
</template>
<script>
  import Tab from "./base/Tab.vue"
    export default{
        data(){
            return {}
        },
        created(){

        },
        computed: {},
        components: {
            Tab
        },
        methods: {},
    }
</script>
<style >
  *{
    margin: 0;
    padding: 0;
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  .content{
    background: #fff;
    position: fixed;
    top: 30px;
    left: 0;
    bottom: 50px;
    width: 100%;
    overflow: auto;
  }
</style>
