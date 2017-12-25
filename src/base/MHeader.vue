<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
    </div>
</template>
<script>
    export default{
        props:["back"],
        data(){
            return {}
        },
        computed: {},
        components: {},
        methods: {
            goBack(){
                this.$router.go(-1);
            }
        },
    }
</script>
<style scoped lang="less">
  .header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: green;
    text-align: center;
    color: white;
  i{
      position: absolute;
      left: 10px;
      color: black;
    }
  }
</style>
