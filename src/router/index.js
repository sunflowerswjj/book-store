import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Home from "../components/Home.vue";
import List from "../components/List.vue";
import Add from "../components/Add.vue";
import Detail from "../components/Detail.vue";
import Collect from "../components/Collect.vue";
export default new Router({
  routes:[
    {path:"/",redirect:"/home"},
    {path:"/home",component:Home,meta:{title:"首页",keepAlive:true}},
    {path:"/list",component:List,meta:{title:"列表"}},
    {path:"/add",component:Add,meta:{title:"添加"}},
    {path:"/collect",component:Collect,meta:{title:"购物车"}},
    {path:"/detail/:bid",component:Detail,name:"Detail",meta:{title:"详情"}},
    {path:"*",redirect:"/home"},
  ]
})
