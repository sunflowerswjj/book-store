<template>
    <div>
      <MHeader :back="true">购物车</MHeader>
      <div class="content">
        <ul>
          <li v-for="book in list">
            <img :src="book.bookCover" alt="">
            <p>{{book.bookName}}</p>
            <button @click="">-</button>{{book.bookCount}}<button @click="">+</button>
            <button class="remove(book.booId)">删除</button>
          </li>
          <li>共{{count}}本</li>
        </ul>
      </div>
    </div>
</template>
<script>
  import MHeader from "../base/MHeader.vue";
  import * as Types from "../store/mutations-type"
  import {mapState,mapGetters} from "vuex";
    export default{
        data(){
            return {
                list:[]

            }
        },
        created(){
            this.list=localStorage.getItem("cartList")?JSON.parse(localStorage.getItem("cartList")):this.cartList;
        },
      methods:{
           remove(){
               this.$store.commit(Types.REMOVE_CART,book)
           }
      },
        computed: {
          ...mapState(["cartList"]),

          ...mapGetters(["count"])
        },
        components: {
          MHeader,
        },
        methods: {},
    }
</script>
<style scoped>
  ul li{
    display: flex;
    justify-content: space-around;
    align-items: center;

  }
  ul li img{
    width: 130px;
    height: 150px;
  }
  ul li button{
    width: 30px;
    height: 30px;
    color: #333;
    background: white;
    border: 0;

  }
  .remove{
    width: 50px;
    height: 30px;
    border: 0;
    background: red;
    color: white;
  }
</style>
