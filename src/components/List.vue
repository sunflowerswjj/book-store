<template>
    <div>
      <MHeader :back="true">列表</MHeader>
      <div class="load" v-if="loading">
        <Login  ></Login>
      </div>
      <div class="content" @scroll="loadMore" ref="scroll">
        <ul>
          <router-link v-for="(book,index) in books" :to="{name:'Detail',params:{bid:book.bookId}}" tag="li" :key="index">
            <img :src="book.bookCover" alt="">
            <div class="container">
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
              <div class="btn-list">
                <button @click.stop="remove(book.bookId)">删除</button>
                <button @click.stop="addCart(book)">添加购物车</button>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
  import MHeader from "../base/MHeader.vue";
  import Login from "../base/Login2.vue";
  import {getPageNation,removeBook} from "../api";
  import * as Types from "../store/mutations-type"
    export default{
        data(){
            return {
                books:[],
                offset:0,
                hasMore:true,
                loading:false,
            }
        },
        created(){
          this.getData();
        },
        mounted(){
            let scroll=this.$refs.scroll;
            let startY=0;
            let distance=0;
            let top=scroll.offsetTop;
            let isMove=false;
            scroll.addEventListener("touchstart",(e)=>{
                if(scroll.scrollTop!=0||scroll.offsetTop!=top)return;
                startY=e.touches[0].pageY;
                let move=(e) =>{
                    this.loading=true;
                    isMove=true;
                  let moveY=e.touches[0].pageY;
                  distance=moveY-startY;
                  if(distance>0){
                    if(distance<=80){
                       scroll.style.top=top+distance+"px";
                    }else {
                       distance=80;
                      scroll.style.top=top+distance+"px";
                    }
                  }else {
                      scroll.removeEventListener("touchmove",move);
                      scroll.removeEventListener("touchend",end);
                  }
                };
                  let end=(e) =>{
                      if(!isMove)return;
                      isMove=false;
                      clearInterval(this.timer1);
                    this.timer1=setInterval(()=>{
                      distance-=1;
                    if(distance<=0){
                        clearInterval(this.timer1);
                        distance=0;
                        scroll.style.top=top+distance+"px";
                      scroll.removeEventListener("touchmove",move);
                      scroll.removeEventListener("touchend",end);
                        this.books=[];
                        this.offset=0;
                        this.hasMore=true;
                        this.loading=false;
                        this.getData();

                      return;
                    }
                    scroll.style.top=top+distance+"px"

                    },10)

              };
                scroll.addEventListener("touchmove",move);
                scroll.addEventListener("touchend",end);

            },false)

        },
        computed: {},
        components: {
          MHeader,
          Login
        },
        methods: {
            addCart(book){
              this.$store.commit(Types.ADD_CART,book);
            },
            loadMore(){
              clearTimeout(this.timer);
              this.timer=setTimeout(()=>{
                let {scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
                if(scrollTop+clientHeight+20>scrollHeight){
                  console.log(this.offset);
                  this.getData();
                }
              },1000)
            },
            async getData(){
              if(this.hasMore&&!this.loading){
                this.loading=true;
                let {hasMore,book}=await getPageNation(this.offset);
                this.books=[...this.books,...book];
                this.hasMore=hasMore;
                this.loading=false;
                this.offset=this.books.length;
              }
            },
            async remove(p){
                await removeBook(p);
                this.books=this.books.filter(item=>item.bookId!=p)
            },
        },
    }
</script>
<style scoped>
  ul{
    width: 90%;
  }
  ul li{
    display: flex;
    margin: 10px 0;
    border-bottom: 1px solid #cccc;
  }
  ul li img{
    width: 120px;
    height: 150px;
  }
  .container h4{
    line-height: 20px;
    color: #000000;
  }
  .container p{
    line-height: 35px;
    color: #2e2e2e;
  }
  .container b{
    color: red;
  }
  button{
    width: 70px;
    height: 40px;
    line-height: 40px;
    color: white;
    border-radius: 5px;
    border: 0;
    background: red;
  }
  .btn-list{
    display: flex;
    justify-content: space-between;
  }
  .load{
    position: fixed;
    width: 100%;
    height: 80px;
    position: absolute;
    line-height: 30px;
    top: 30px;
    background: white;
    text-align: center;

  }
</style>
