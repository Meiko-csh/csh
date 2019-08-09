<template>
  <div class="yz-head">
    <div class="c_header">
      <div class="c_header_2L">
        <img src="../../assets/logo.png" alt class="c_logo" >
        <input type="search" placeholder="搜索菜品"  v-model="title">
        <mt-button @click="search" class="btn">搜索</mt-button>
        <div class="iconfont icon-caidan3 c_caidan" @click="toggle"></div>
        <div class="dropdown-menu" :class="bClass">
          <div class="sanjiao"></div>
          <ul>
            <li class="iconfont icon-shouye" @click="l1">
              <span>首页</span>
            </li>
            <li v-if="n" class="iconfont icon-ren-" @click="l2" id="login">
              <span>登录</span>
            </li>
            <li v-else class="iconfont icon-ren-" v-on:click="zx" id="login">
              <span>注销</span>
            </li>
            <li class="iconfont icon-ren" @click="l3">
              <span>注册</span>
            </li>
            <li class="iconfont icon-kefu" @click="l4">
              <span>联系商家</span>
            </li>
            <li class="iconfont icon-shuoming" @click="l5">
              <span>关于我们</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
       
import { Header, Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    
    return {
      bClass: {
        down: false,
        fade: true,  
      },
      n:true,
      title:"",
    };
  },
  methods: {
    toggle(e) {
      e.stopPropagation();
      if (this.bClass.down) {
        this.bClass.down = false;
        this.bClass.fade = true;
      } else {
        this.bClass.down = true;
        this.bClass.fade = false;
      }
    },
    l1() {
      this.$router.push("/index");
    },
    l2() {
      this.$router.push("/login");
    },
    l3() {
      this.$router.push("/reg");
    },
    l4() {
      this.$messagebox("联系商家", "请拨打电话：010-67117777");
    },
    l5() {
      this.$router.push("/we");
    },
    zx(){
         this.n = true;
          sessionStorage.removeItem("uname");
          sessionStorage.removeItem("data");
         this.$router.push("/login");
    },
    search(){
      var title = this.title;
      if (title=="") {
        this.$toast("请输入菜品名");
        this.title = "";
        return;
      }
      var obj = { title };
      var url = "search";
      this.axios.get(url, { params: obj }).then(result => {
        if (result.data.code > 0) {  
         this.$router.push({ path: "details", query: { id: result.data.data[0].mid } });
         console.log(result);
        } else {
          this.$messagebox("提示", "无此类型商品"); 
        }
      });
    }
  },
  created() {
    var aaa = document.querySelector(":not(dropdown-menu)");
    aaa.onclick = e => {
      e.stopPropagation();
      this.bClass.down = false;
      this.bClass.fade = true;
    };
    var n1 = sessionStorage.getItem("uname");
        if(n1){
          this.n = false
        }
        

  }
  
};

</script>
<style scoped>
.yz-head {
  position: fixed;
  z-index: 999;
  background: white;
  width: 100%;
}
.c_header {
  margin: 3% 0;
  width: 100%;
  position: relative;
}
/*头部*/
.c_header_2L {
  display: flex;
  height: 32px;
  justify-content: space-around;
}
/*logo*/
.c_logo {
  width: 50px;
  height: 100%;
}
/*头部输入框*/
.c_header .c_header_2L input {
  border: none;
  border-radius: 30px;
  width: 50%;
  /*去掉文本框轮廓为0*/
  outline: 0;
  line-height: 32px;
  color: #b3b3b3;
  padding: 0 7% 0 8%;
  background: #ededed url(../../assets/sousuo.jpg) no-repeat;
  background-size: 5%;
  background-position: 1rem center;
}
/*搜索按钮*/
.btn{
  width:48px;
  height: 100%;
  border-radius: 15px;
  font-size: 4px;
  padding: 0px;
}
/*头部菜单样式*/
.c_header .c_header_2L .c_caidan {
  padding-top: 5px;
  font-size: 25px;
}
/*下拉菜单*/
.c_header .dropdown-menu {
  width: 37%;
  height: 37%;
  position: fixed;
  background: rgb(241, 241, 241);
  top: 7%;
  right: 0%;
  z-index: 150;
}
.dropdown-menu ul > li + li {
  text-align: center;
  padding-top: 10%;
  padding-bottom: 10%;
  list-style: none;
}
.dropdown-menu ul > li:first-child {
  text-align: center;
  padding-top: 10%;
  padding-bottom: 10%;
  list-style: none;
}
.dropdown-menu li > span {
  text-decoration: none;
  color: #000;
  display: inline-block;
  margin-left: 12px;
  color: #000;
}
.dropdown-menu li:hover {
  background: #ccc;
}
.fade {
  display: none;
}
.down {
  display: block;
}
.dropdown-menu > .sanjiao {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 11px solid rgb(241, 241, 241);
  top: -11px;
  right: 11px;
}
</style>