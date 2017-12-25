<template>
    <div>
      <MHeader :back="false">首页</MHeader>
      <div class="content">
        <Login v-if="loading"></Login>
      <template v-else>
        <Swiper :swiperSlides="sliders" ></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="book in books">
              <img :src="book.bookCover" alt="">
              <b>{{book.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
      </div>
    </div>
</template>
<script>
  import MHeader from "../base/MHeader.vue";
  import Swiper from "../base/Swiper.vue";
  import Login from "../base/Login.vue"
  import {getAll} from "../api"
    export default{
      data(){
        return {
          books: [],
          sliders: [],
          loading:true,
        }
      },
      created(){
        this.getData();


      },
      computed: {},
      components: {
        MHeader,
        Swiper,
        Login
      },
      methods: {
        async getData(){
          let [getSliders,getHotBook]=await getAll();
          this.sliders=getSliders;
            this.books=getHotBook;
            this.loading=false;
        }

      }
    }
</script>
<style scoped lang="less">
ul{
  width: 100%;
  display:flex;
  flex-wrap: wrap;

}
.container li{
    width: 50%


}
.container img{
  width: 100%;
}
.container b{
  color: red;
}
</style>
