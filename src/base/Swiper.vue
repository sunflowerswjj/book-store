<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
      props:["swiperSlides"],
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          observeParents:true,
        },
      }
    }
  }
</script>
<style scoped>
img{
  width: 100%;
}
</style>
