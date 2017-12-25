<template>
    <div>
      <MHeader :back="true">详情</MHeader>
      <div class="content">
        <ul>
          <ul >
            <li>
              <label for="bookName">书的名称</label><input type="text" v-model="book.bookName" id="bookName">
            </li>
            <li>
              <label for="bookInfo">书的信息</label><input type="text" v-model="book.bookInfo" id="bookInfo">
            </li>
            <li>
              <label for="bookPrice">书的价格</label><input type="text" v-model="book.bookPrice" id="bookPrice">
            </li>
            <li>
              <button @click="editor">确认修改</button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
</template>
<script>
  import MHeader from "../base/MHeader.vue";
  import {findOneBook,updata} from "../api"
    export default{
        data(){
            return {
                book:{}
            }
        },
        created(){
          this.getData()
        },
        computed: {
            bid(){
               return this.$route.params.bid;
            }
        },
        components: {
          MHeader,
        },
        methods: {
            async getData(){
              this.book=await findOneBook(this.bid);
              Object.keys(this.book).length>0?void 0:this.$router.push("/list");
            },
          async editor(){
            await updata(this.bid,this.book);
            this.$router.push("/list");
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
