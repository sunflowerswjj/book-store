<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link >
      <router-link to="/list">
        <i class="iconfont icon-liebiaoyemian"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/add">
        <i class="iconfont icon-add"></i>
        <span>添加</span>
      </router-link>
      <router-link to="/collect">
        <i class="iconfont icon-shoucang"></i>
        <span>购物车</span>
      </router-link>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        computed: {},
        components: {},
        methods: {},
    }
</script>
<style scoped lang="less">
  .footer{
    position: fixed;
    width: 100%;
    height: 50px;
    left: 0;
    bottom: 0;
    background: green;

    display: flex;
  a{
      color: #333;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
