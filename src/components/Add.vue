<template>
    <div>
      <MHeader :back="true">添加</MHeader>
      <div class="content">
        <ul>
          <li>
            <label for="bookName">书的名称</label> <input type="text" id="bookName" v-model="book.bookName">
          </li>
          <li>
            <label for="bookCover">书的封面</label> <input type="text" id="bookCover" v-model="book.bookCover">
          </li>
          <li>
            <label for="bookInfo">书的信息</label> <input type="text" id="bookInfo" v-model="book.bookInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格</label> <input type="text" id="bookPrice" v-model="book.bookPrice">
          </li>
          <li>
            <button @click.stop="add">确认添加</button>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import MHeader from "../base/MHeader.vue";
  import {addBook} from "../api"
    export default{
        data(){
            return {
                book:{},
            }
        },
        computed: {},
        components: {
          MHeader,
        },
        methods: {
            async add(){
               await addBook(this.book);
               this.$router.push("/list")
            }
        },
    }
</script>
<style scoped>
  ul{
    width: 90%;

  }
  ul li{
    margin: 5px 0;
  }
  button{
    width: 150px;
    height: 40px;
    line-height: 40px;
    color: white;
    border-radius: 5px;
    border: 0;
    background: #00ffff;
  }
</style>
